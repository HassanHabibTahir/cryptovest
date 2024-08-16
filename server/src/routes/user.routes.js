import { Router } from 'express';
import passport from 'passport';
import {
  deleteUserProfileHandler,
  getUserDetailsHandler,
  updateUserCredentialsHandler,
  uploadPicHanlder,
} from '../controller/index.js';

export const userRoutes = Router();
//middleware to extract token from user
userRoutes.use(passport.authenticate('jwt', { session: false }));

/** ------------------------------------------------------------------------------------------------
*  @method GET
  @desc  get user details -  PRIVATE 
  @route /api/user
**/

userRoutes.get('/', getUserDetailsHandler);

/** ------------------------------------------------------------------------------------------------
*  @method POST
  @desc  upload profile picture and store in data bases -  PRIVATE 
  @route /api/user/upload
**/
userRoutes.post('/upload', uploadPicHanlder);

/** ------------------------------------------------------------------------------------------------
*  @method PUT
  @desc  upload profile fields into data base -  PRIVATE 
  @route /api/user/update
**/
userRoutes.put('/update', updateUserCredentialsHandler);

/** ------------------------------------------------------------------------------------------------
*  @method DELETE
  @desc  delete user  profile and remove from  database -  PRIVATE 
  @route /api/user/delete
**/
userRoutes.delete('/delete', deleteUserProfileHandler);
