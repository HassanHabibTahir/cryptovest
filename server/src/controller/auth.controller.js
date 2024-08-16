import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import twilio from 'twilio';
import bcrypt from 'bcrypt';
import otpGenerator from 'otp-generator';

import { BadRequest, CustomError, logIn } from '../middlewares/index.js';
import { User } from '../models/user.js';
import {
  sendVerificationMail,
  client,
  sendResetMail,
  sendSecondaryVerificationMail,
  getRedirectBody,
  primaryEmailForWithdraw,
  secondaryEmailForWithdraw,
} from '../utils/index.js';
import { Vault } from '../models/Vault.js';
const { APP_SECRET, BCRYPT_WORK_FACTOR } = process.env;

const {
  VERIFICATION_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SMS_SERVICE,
} = process.env;

export const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// setTimeout(async () => {
//   await User.updateMany({}, { usdtBalance: 10000 });
//   console.log('ho gya');
// }, 3000);

// Register
export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (![firstName, lastName, email, password].every(Boolean))
    throw new BadRequest('Please fill all inputs!');
  const checkUser = await User.findOne({ email: req?.body?.email });
  if (checkUser) {
    throw new BadRequest('Email Already in use');
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    usdtBalance: '10000',
  });

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
    digits: true,
  });
  const timestamp = Date.now() + 900000;
  user.otpverification = { otp, expiry: new Date(timestamp) };
  // const tokenForEmailConfirm = jwt.sign(
  //   user?._id?.toString(),
  //   VERIFICATION_SECRET,
  // );
  // const emailTokeExpiry = dayjs().add(15, 'minute');
  // user.verificationToken = { token: tokenForEmailConfirm, emailTokeExpiry };

  await user.save();
  await sendVerificationMail(user, otp);

  res.status(201).json({
    success: true,
    message: 'Please Check Your Email For OTP',
  });
};

// ===========================verify otp===========================
export const verificationOTPForSignup = async (req, res) => {
  const { otp, isReset } = req.body;
  console.log(otp, isReset);
  const findUser = await User.findOne({ 'otpverification.otp': otp });
  if (!findUser) {
    throw new BadRequest('Invalid Operation');
  }
  const currentTimestamp = Date.now();
  if (findUser?.otpverification.expiry < currentTimestamp) {
    await findUser.updateOne({
      otpverification: { otp: '', expiry: '' },
    });
    throw new BadRequest('OTP Expired');
  }

  // const user = await User.findById({ _id: findUser?._id });

  let token;

  if (isReset) {
    console.log(VERIFICATION_SECRET);
    token = jwt.sign({ _id: findUser?._id.toString() }, VERIFICATION_SECRET, {
      expiresIn: '15m',
    });
  } else {
    token = await logIn({ _id: findUser?._id });
  }

  const newUser = await User.findByIdAndUpdate(
    findUser?._id,
    {
      otpverification: { otp: '', expiry: '' },
      isVerified: true,
    },
    { new: true },
  ).select('-otpverification');
  console.log('otp verify token===========>>>>>>>>>>>', token);
  res.status(200).json({
    success: true,
    user: newUser,
    token,
  });
};

export const secondaryEmailRegister = async (req, res) => {
  const { secondaryEmail } = req.body;
  const checkUser = await User.findOne({ secondaryEmail });
  const emailIsExit = await User.find({ email: secondaryEmail });
  if (emailIsExit.length > 0) {
    throw new BadRequest('Email is Already in use');
  }
  const user = await User.findById(req?.user?._id);
  if (checkUser || !user) {
    throw new BadRequest('Email Already in use');
  }

  const tokenForEmailConfirm = jwt.sign(
    user?._id.toString(),
    VERIFICATION_SECRET,
  );
  const emailTokeExpiry = dayjs().add(15, 'minute');
  User.findOneAndUpdate(
    { _id: req?.user?._id },
    { verificationToken: { token: tokenForEmailConfirm, emailTokeExpiry } },
  );
  await sendSecondaryVerificationMail(user, secondaryEmail);
  res.status(201).json({
    success: true,
    message: 'Please Check Your Email For Confirmation Link',
  });
  console.log('route hit');
};

// Check if secondary  Email Verified
export const secondaryEmailverifyEmail = async (req, res) => {
  const { token, email } = req.query;
  const findUser = await User.findOne({
    'verificationToken.token': token,
  });

  if (!findUser) {
    throw new BadRequest('User Not Found');
  }
  if (dayjs().isAfter(findUser?.verificationToken?.expiry)) {
    throw new BadRequest('Token Expired');
  }

  await User.findOneAndUpdate(
    {
      'verificationToken.token': token,
    },
    {
      isVerified: true,
      secondaryEmail: email,
    },
  );

  res.send(
    getRedirectBody('Email Verified', '"' + client + '/dashboard/trade' + '"'),
  );
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  const findUser = await User.findOne({
    'verificationToken.token': token,
  });

  if (!findUser) {
    throw new BadRequest('User Not Found');
  }
  if (dayjs().isAfter(findUser?.verificationToken?.expiry)) {
    throw new BadRequest('Token Expired');
  }

  await User.findOneAndUpdate(
    {
      'verificationToken.token': token,
    },
    {
      isVerified: true,
    },
  );
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);

  res.send(
    getRedirectBody(
      'Email Verified',
      '"' + client + '/two-step-verification/' + '"',
    ),
  );
};

// Send Code SMS
export const sendSMCode = async (req, res) => {
  const { number } = req.body;
  console.log('number', number);

  const user = await User.findById(req?.user?._id);
  if (!user) {
    throw new BadRequest('User Not Found !');
  }

  // if (req?.user?.twoStepVerification && req?.user?.number === number) {
  //   throw new CustomError('This Number is already in use', 402);
  // }

  twilioClient.verify.v2
    .services(TWILIO_SMS_SERVICE)
    .verifications.create({
      to: `+${user?.number ?? number}`,
      channel: 'sms',
    })
    .then(async () => {
      await user?.updateOne({ number });
      res.status(200).json({
        success: true,
        message: 'Code sent successfully',
      });
    })
    .catch((e) => {
      console.log('twillo error', e);
      throw new CustomError('Something went wrong', 500);
    });

  // Code to create Msg Service
  // twilioClient.verify.v2.services
  //   .create({ friendlyName: "My First Verify Service" })
  //   .then((service) => console.log(service.sid));
};

// Match SMS Code
export const verifySMSCode = async (req, res) => {
  const { code } = req.body;
  const number = req?.user?.number;
  //send Verification Message

  twilioClient.verify.v2
    .services(TWILIO_SMS_SERVICE)
    .verificationChecks.create({ to: `+${number}`, code })
    .then(async (verification_check) => {
      if (verification_check?.status === 'approved') {
        const user = await User.findByIdAndUpdate(
          req?.user?._id,
          { twoStepVerification: true, isLoggedIn: true, number },
          { new: true },
        ).select('-otpverification');
        return res.status(200).json({
          status: verification_check?.status,
          data: user,
        });
      } else {
        throw new CustomError(`${verification_check?.status}`, 401);
      }
    })
    .catch((e) => {
      res.status(500).json({
        message: 'Something went wrong',
      });
    });
};

// User LogIn
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (![email, password].every(Boolean))
    throw new BadRequest('Please fill all inputs!');

  const user = await User.findOneAndUpdate(
    { email },
    { isLoggedIn: false },
  ).select('-otpverification');

  if (!user || !(await user.matchesPassword(password))) {
    throw new BadRequest('Incorrect email or password');
  }
  if (!user?.isVerified) {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });
    const timestamp = Date.now() + 900000;
    const updatedUser = await User.findByIdAndUpdate(
      user?._id,
      {
        'otpverification.otp': otp,
        'otpverification.expiry': new Date(timestamp),
      },
      { new: true },
    );
    await sendVerificationMail(updatedUser, otp);

    return res.status(201).json({
      success: true,
      message: 'Please Check Your Email For OTP',
      user: updatedUser,
    });
  }

  const token = await logIn({ _id: user?._id });
  if (!user?.number) {
    return res.status(200).json({
      success: true,
      token,
      message: 'Please setup two step verification',
      user,
    });
  }

  twilioClient.verify.v2
    .services(TWILIO_SMS_SERVICE)
    .verifications.create({
      to: `+${user?.number}`,
      channel: 'sms',
    })
    .then(async () => {
      res.status(200).json({
        success: true,
        token,
        message: 'Code sent successfully',
        user,
      });
    })
    .catch((e) => {
      console.log('twillo error', e);
      throw new CustomError('Something went wrong', 500);
    });
};

//send Mail
export const sendMail = async (req, res) => {
  const user = await User.findById(req?.user?._id);

  if (!user) {
    throw new BadRequest('User Not Found !');
  }
  const tokenForEmailConfirm = jwt.sign(
    user?._id?.toString(),
    VERIFICATION_SECRET,
  );
  const emailTokeExpiry = dayjs().add(15, 'minute');

  await User.findByIdAndUpdate(user?._id, {
    verificationToken: { token: tokenForEmailConfirm, emailTokeExpiry },
  });
  await sendVerificationMail(user);

  res.status(200).json({
    success: true,
    message: 'Please Check Your Mail For Confirmation',
  });
};

// forgotPassword
export const forgetPassword = async (req, res) => {
  const { email } = req.params;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new BadRequest('User Not Found');
  }

  // const token = await logIn({ _id: findUser?._id });
  const token = jwt.sign(
    { _id: findUser?._id.toString() },
    VERIFICATION_SECRET,
    {
      expiresIn: '15m',
    },
  );

  // const error = await sendMailForForgotPassword(email, token);

  const error = await sendResetMail(findUser, '', token);
  if (error) {
    // Display an error message or take appropriate action
    return res.status(400).json({
      success: false,
      message: 'Error occured while sending email',
    });
  }
  // Display a success message or take appropriate action
  return res.status(201).json({
    success: true,
    message:
      'Email sent to your address! Verify your email address to proceed.',
  });
  // const verifyToken = jwt.sign(findUser?._id?.toString(), VERIFICATION_SECRET);
  // const expiry = dayjs().add(15, 'minute');
  // const otp = otpGenerator.generate(6, {
  //   upperCaseAlphabets: false,
  //   specialChars: false,
  //   lowerCaseAlphabets: false,
  //   digits: true,
  // });
  // const timestamp = Date.now() + 900000;
  // console.log(otp, 'forget route');
  // const updateUser = await User.findByIdAndUpdate(
  //   { _id: findUser._id },
  //   {
  //     verificationToken: { token: verifyToken, expiry },
  //     otpverification: { otp: otp, expiry: new Date(timestamp) },
  //   },
  // );
  // await sendResetMail(updateUser, otp);
  // res.status(201).json({
  //   success: true,
  //   message: 'Please Check Your Email For Confirmation',
  // });
};
//change password
export const changePassword = async (req, res) => {
  const { password, token } = req.body;
  jwt.verify(token, VERIFICATION_SECRET, async (err, decoded) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new BadRequest('Token has expired.');
      } else if (err instanceof jwt.JsonWebTokenError) {
        throw new BadRequest('Invalid token.');
      } else {
        throw new BadRequest('Error while verifying token.');
      }
    } else {
      const findUser = await User.findById(decoded?._id);

      if (!findUser) {
        throw new CustomError('User not found', 404);
      }
      await findUser.updateOne({
        password: bcrypt.hashSync(password, Number(BCRYPT_WORK_FACTOR)),
      });

      res.status(201).json({
        success: true,
        message: 'Password updated successfully!',
      });
    }
  });
};

// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Document</title>
//     <style>
//       * {
//         margin: 0;
//         padding: 0;
//         box-sizing: border-box;
//       }
//       div {
//         width: 100vw;
//         height: 100vh;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         background-color: #000;
//         font-family: sans-serif;
//       }
//       h1 {
//         background: linear-gradient(
//           180deg,
//           #d09b03 0%,
//           #fef9c8 35.06%,
//           #d38d00 74.31%,
//           #fff8c4 116%
//         );
//         -webkit-text-fill-color: transparent;
//         -webkit-background-clip: text;
//       }
//     </style>
//   </head>
//   <body>
//     <div>
//       <h1>${message}</h1>
//     </div>
//     <script>
//     setTimeout(() => {
//         window.location.href = ${'"' + client + '/two-step-verification/' + '"'}
//     }, 2000);
// </script>
//   </body>
// </html>
//       `;

// const getRedirectBodytwo = (message) => `
//       <!DOCTYPE html>
//       <html lang="en">
//         <head>
//           <meta charset="UTF-8" />
//           <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//           <title>Document</title>
//           <style>
//             * {
//               margin: 0;
//               padding: 0;
//               box-sizing: border-box;
//             }
//             body {
//               min-width: 100vw;
//               width: 100%;
//               min-height: 100vh;
//               height: 100%;
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               background-color: #353535;
//               font-family: sans-serif;
//             }
//             div {
//               text-align: center;
//               max-width: 600px;
//               width: 100%;
//               border: 1px solid red;
//               padding: 50px;
//               background: #31312c;
//               backdrop-filter: blur(5px);
//               border-radius: 15px;
//               border: 2px solid #d09b03;
//               padding: 50px;
//             }
//             h1 {
//               margin-top: 30px;
//               background: linear-gradient(
//                 180deg,
//                 #d09b03 0%,
//                 #fef9c8 35.06%,
//                 #d38d00 74.31%,
//                 #fff8c4 116%
//               );
//               -webkit-text-fill-color: transparent;
//               -webkit-background-clip: text;
//             }
//           </style>
//         </head>
//         <body>
//           <div>
//             <img
//               src="data:image/png;base64,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"
//               alt="email"
//               srcset=""
//               width="150px"
//             />
//             <h1>You've successfully confirmed your secondary e-mail address</h1>
//           </div>
//           <script>
//           setTimeout(() => {
//               window.location.href = ${'"' + client + '/dashboard/trade' + '"'}
//           }, 2000);
//       </script>
//         </body>
//       </html>

//       `;

// verify Email For WithDraw

export const sendPrimaryEmail = async (req, res) => {
  console.log(req.user);
  if (!req?.user?.ethVault) {
    throw new BadRequest('User not found');
  }

  var token = jwt.sign(req?.user, VERIFICATION_SECRET, {
    expiresIn: 60 * 15,
  });

  await primaryEmailForWithdraw(req?.user?.email, token);

  res
    .status(200)
    .json({ message: 'Primary Email sent', email: req?.user?.email });
};

export const verifyPrimaryForWithdraw = async (req, res) => {
  const { token } = req.query;
  let decoded = jwt.verify(token, VERIFICATION_SECRET);

  const vault = await Vault.findByIdAndUpdate(
    decoded?.ethVault?._id,
    { withDrawReady: 'partial' },
    { new: true },
  );

  if (!vault) {
    throw new BadRequest('Vault Not Found');
  }

  var newToken = jwt.sign({ _id: vault?._id }, VERIFICATION_SECRET, {
    expiresIn: 60 * 15,
  });

  await secondaryEmailForWithdraw(decoded?.secondaryEmail, newToken);

  res.send(
    getRedirectBody(
      `Primary Email Verified! Kindly Check Your Secondary Email ${decoded?.secondaryEmail} For Verification`,
      '"' + client + '/dashboard/trade' + '"',
    ),
  );
};

export const verifySecondaryForWithdraw = async (req, res) => {
  const { token } = req.query;
  let decoded = jwt.verify(token, VERIFICATION_SECRET);
  const vault = await Vault.findById(decoded?._id);

  if (!vault?.withDrawReady === 'partial') {
    throw new BadRequest('Please Verify Primary Email First');
  }

  await Vault.findByIdAndUpdate(vault?._id, { withDrawReady: 'true' });

  res.send(
    getRedirectBody(
      'Your Secondary Email Verified',
      '"' + client + '/dashboard/trade' + '"',
    ),
  );
};
