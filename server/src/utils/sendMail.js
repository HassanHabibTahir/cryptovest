import sgMail from '@sendgrid/mail';

const { SENDGRID_API_KEY, IN_PROD } = process.env;

export const server =
  IN_PROD === 'true'
    ? 'https://crypto-vest-3173718ad5ad.herokuapp.com/api/auth'
    : 'http://localhost:5050/api/auth';

export const client =
  IN_PROD === 'true'
    ? 'https://crypto-vest-test.netlify.app'
    : 'http://localhost:5173';

sgMail.setApiKey(SENDGRID_API_KEY);
// user and origin is coming from signLog.js , origin is hardcoded given and user is send after finding the specific user
const returnHtml = (otp, token) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .main {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #000;
          font-family: sans-serif;
          color: #fff;
        }
  
        .container {
          max-width: 600px;
          width: 100%;
          padding: 0 30px;
        }
        .button-1 {
          padding: 15px 25px;
          background: linear-gradient(
            180deg,
            #d09b03 0%,
            #fef9c8 35.06%,
            #d38d00 74.31%,
            #fff8c4 116%
          );
          border-radius: 15px;
          font-size: 15px;
          color: "#292929";
          font-weight: 600;
        }
        h1 {
          text-align: center;
          background: linear-gradient(
            180deg,
            #d09b03 0%,
            #fef9c8 35.06%,
            #d38d00 74.31%,
            #fff8c4 116%
          );
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
        }
        .firstParagraph {
          margin-top: 150px;
          margin-bottom: 30px;
          font-size: 20px;
        }
        .secondParagraph {
          margin-top: 15px;
          font-size: 15px;
        }
      </style>
    </head>
    <body>
      <div class="main">
        <div class="container">
          <h1>Confirm Your Email</h1>
          <p class="firstParagraph">You are just one step away</p>
          ${token ? `${otp}` : ` <div class="button-1" >  ${otp} </div>`}
         
          <p class="secondParagraph">
            If you received this email by mistake, simply delete it. You won't be
            subscribed if you don't click the confirmation link above.
          </p>
        </div>
      </div>
    </body>
  </html>`;
};

export const sendVerificationMail = async (user, otp) => {
  console.log(user);
  const verifyUrl = `${server}/verify-email?token=${user?.verificationToken?.token}`;

  const msg = {
    to: user?.email,
    from: { name: 'Cryptovest', email: 'baberbao80026@gmail.com' }, // Use the email address or domain you verified above
    subject: 'Verify Your Email Address',
    text: 'Please Click The Below Link To Verify Your Email Address',
    html: returnHtml(otp),
  };

  await sgMail.send(msg);
};

export const sendResetMail = async (user, otp, token) => {
  const verifyUrl = `${client}/reset-password?token=${token}`;
  // const verifyUrl = `${client}/reset-password?token=${reset?.split(' ')[1]}`;
  console.log(verifyUrl);
  const msg = {
    to: user?.email,
    from: { name: 'Cryptovest', email: 'baberbao80026@gmail.com' }, // Use the email address or domain you verified above
    subject: 'Password Reset Request',
    text: 'Please Click The Below Link To Verify Your Email Address',
    html: returnHtml(token ? verifyUrl : otp, token),
  };

  await sgMail.send(msg);
};

export const sendSecondaryVerificationMail = async (user, secondaryEmail) => {
  const verifyUrl = `${server}/verify-secondaryEmail?token=${user?.verificationToken?.token}&email=${secondaryEmail}`;

  const msg = {
    to: secondaryEmail,
    from: { name: 'Cryptovest', email: 'baberbao80026@gmail.com' }, // Use the email address or domain you verified above
    subject: 'Verify Your Secondary Email Address',
    text: 'Please Click The Below Link To Verify Your Secondary Email Address',
    html: returnHtml(verifyUrl),
  };

  await sgMail.send(msg);
};

export const primaryEmailForWithdraw = async (email, token) => {
  const verifyUrl = `${server}/verifyPrimaryForWithdraw?token=${token}`;

  const msg = {
    to: email,
    from: { name: 'Cryptovest', email: 'baberbao80026@gmail.com' }, // Use the email address or domain you verified above
    subject: 'Verify Your Primary Email Address',
    text: 'Please Click The Below Link To Verify Your Secondary Email Address',
    html: returnHtml(verifyUrl),
  };

  await sgMail.send(msg);
};

export const secondaryEmailForWithdraw = async (email, token) => {
  const verifyUrl = `${server}/verifySecondaryForWithdraw?token=${token}`;

  const msg = {
    to: email,
    from: { name: 'Cryptovest', email: 'baberbao80026@gmail.com' }, // Use the email address or domain you verified above
    subject: 'Verify Your Secondary Email Address',
    text: 'Please Click The Below Link To Verify Your Secondary Email Address',
    html: returnHtml(verifyUrl),
  };

  await sgMail.send(msg);
};

export const getRedirectBody = (message, link) => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              min-width: 100vw;
              width: 100%;
              min-height: 100vh;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #353535;
              font-family: sans-serif;
            }
            div {
              text-align: center;
              max-width: 600px;
              width: 100%;
              border: 1px solid red;
              padding: 50px;
              background: #31312c;
              backdrop-filter: blur(5px);
              border-radius: 15px;
              border: 2px solid #d09b03;
              padding: 50px;
            }
            h1 {
              margin-top: 30px;
              background: linear-gradient(
                180deg,
                #d09b03 0%,
                #fef9c8 35.06%,
                #d38d00 74.31%,
                #fff8c4 116%
              );
              -webkit-text-fill-color: transparent;
              -webkit-background-clip: text;
            }
          </style>
        </head>
        <body>
          <div>
            <img
              src="data:image/png;base64,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"
              alt="email"
              srcset=""
              width="150px"
            />
            <h1>${message}</h1>
          </div>
          <script>
          setTimeout(() => {
              window.location.href = ${link}
          }, 5000);
      </script>
        </body>
      </html>


      `;
