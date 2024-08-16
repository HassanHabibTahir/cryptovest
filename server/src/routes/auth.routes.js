import { Router } from 'express';
import {
  changePassword,
  forgetPassword,
  login,
  register,
  sendMail,
  sendSMCode,
  verifyEmail,
  verifySMSCode,
  secondaryEmailRegister,
  secondaryEmailverifyEmail,
  verifySecondaryForWithdraw,
  verifyPrimaryForWithdraw,
  sendPrimaryEmail,
  verificationOTPForSignup,
} from '../controller/index.js';
import passport from 'passport';
import { catchAsync } from '../middlewares/index.js';
export const authRoutes = Router();
/** ----------------------------------------- REGISTER-------------------------------------------------------
 *  @method POST
    @desc make new acccount -  PUBLIC 
    @route /api/auth/register
 **/
authRoutes.post('/register', catchAsync(register));

/** ----------------------------------------- VERIFY EMAIL-------------------------------------------------------
 *  @method GET
    @desc get dashboard overview  -  PUBLIC 
    @route /api/auth/verify-email
 **/

authRoutes.get('/verify-email', catchAsync(verifyEmail));

/** ----------------------------------------- VERIFY OTP---------------f----------------------------------------
 *  @method POST
    @desc get dashboard overview  -  PUBLIC 
    @route /api/auth/verify-otp
 **/

authRoutes.post('/verify-otp', catchAsync(verificationOTPForSignup));

/** ------------------------------------------------------------------------------------------------
 *  @method POST
    @desc send sms code -  PRIVATE 
    @route /api/auth/sendSmsCode
 **/
authRoutes.post(
  '/sendSmsCode',
  passport.authenticate('jwt', { session: false }),
  catchAsync(sendSMCode),
);

/** ------------------------------------------------------------------------------------------------
*  @method POST
  @desc verify sms code -  PRIVATE 
  @route /api/auth/verifySmsCode
**/
authRoutes.post(
  '/verifySmsCode',
  passport.authenticate('jwt', { session: false }),
  catchAsync(verifySMSCode),
);

/** ------------------------------------------------------------------------------------------------
*  @method POST
  @desc login -  PUBLIC 
  @route /api/auth/login
**/
authRoutes.post('/login', catchAsync(login));

/** ------------------------------------------------------------------------------------------------
*  @method POST
  @desc  send mail -  PRIVATE 
  @route /api/auth/verifySmsCode
**/
authRoutes.post(
  '/sendMail',
  passport.authenticate('jwt', { session: false }),
  catchAsync(sendMail),
);

/** ------------------------------------------------------------------------------------------------
*  @method POST
  @desc  request for password reset -  PRIVATE 
  @route /api/auth/verifySmsCode
**/
authRoutes.get('/forgotPassword/:email', catchAsync(forgetPassword));

/** ------------------------------------------------------------------------------------------------
*  @method POST
  @desc  change user password -  PRIVATE 
  @route /api/auth/verifySmsCode
**/
authRoutes.post('/changepassword', catchAsync(changePassword));

//secondary email register
authRoutes.post(
  '/secondaryEmailRegister',
  passport.authenticate('jwt', { session: false }),
  catchAsync(secondaryEmailRegister),
);

//verify Email
authRoutes.get('/verify-secondaryEmail', catchAsync(secondaryEmailverifyEmail));

// verify EMails for Withdraw
authRoutes.get(
  '/verifyEmailForWithdraw',
  passport.authenticate('jwt', { session: false }),
  catchAsync(sendPrimaryEmail),
);
authRoutes.get(
  '/verifyPrimaryForWithdraw',

  catchAsync(verifyPrimaryForWithdraw),
);
authRoutes.get(
  '/verifySecondaryForWithdraw',

  catchAsync(verifySecondaryForWithdraw),
);
