import dayjs from 'dayjs';
import { uploadBufferPicInstance } from '../config/index.js';
import { CustomError } from '../middlewares/index.js';
import { User } from '../models/index.js';

// get all user details
async function getUserDetailsHandler(req, res) {
  try {
    // console.log('req.user', req);
    res.json(req.user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

function uploadPicHanlder(req, res) {
  return uploadBufferPicInstance(req, res, async (err) => {
    try {
      if (err) throw new CustomError(err, 401);

      let file = req.file;
      if (!file) throw new CustomError('No File Found!', 401);
      let { _id: id } = req.user;
      if (!id) throw new CustomError('Invalid Credentials!', 401);

      // insert in db
      await User.findByIdAndUpdate(
        id,
        {
          profilePicMimeType: file.mimetype,
          profilePicBuffer: file.buffer,
        },
        { new: true },
      ).exec();

      // send response
      res.status(201).json({
        message: 'Profile Pic is updated successfully!',
        success: true,
      });
    } catch (error) {
      let errorMessage =
        'Error occured while uplaoding profile picture, Try again!';
      if (error instanceof CustomError) errorMessage = error.message;

      console.log('Error while file uploading => ', error.message);
      res
        .status(error.status || 500)
        .json({ error: errorMessage, success: false });
    }
  });
}

async function updateUserCredentialsHandler(req, res) {
  try {
    const { _id: id } = req.user;
    if (!id) throw new CustomError('No User Id Found!', 401);
    const {
      firstName,
      lastName,
      dob,
      timeZone,
      currency,
      resedentialAddress,
      cryptoAddressess,
    } = req.body;
    // check for updates
    let updateObj = {};
    // only add properties if they exits
    if (timeZone) updateObj.timeZone = timeZone;
    if (cryptoAddressess && cryptoAddressess.length)
      updateObj.cryptoAddressess = cryptoAddressess;
    if (dob && dayjs(dob).isValid()) updateObj.dob = dob;
    if (firstName) updateObj.firstName = firstName;
    if (lastName) updateObj.lastName = lastName;
    if (resedentialAddress) updateObj.resedentialAddress = resedentialAddress;
    if (currency) updateObj.currency = currency;
    // insert into database
    let updatedUser = await User.findByIdAndUpdate(id, updateObj, {
      new: true,
    }).exec();
    res.status(201).json(updatedUser);
  } catch (error) {
    let errorMessage =
      'Invalid Credentials! Error occured while updating profile fields, Try again!';
    if (error instanceof CustomError) errorMessage = error.message;
    res
      .status(error.status || 500)
      .json({ error: errorMessage, success: false });
  }
}

async function deleteUserProfileHandler(req, res) {
  try {
    if (!req.user._id) throw new CustomError('No User Id Found!', 401);
    await User.findByIdAndRemove(req.user._id);
    res.status(204).json({ success: true });
  } catch (error) {
    let errorMessage = 'Error occured while deleting profile, Try again!';
    if (error instanceof CustomError) errorMessage = error.message;
    res
      .status(error.status || 500)
      .json({ error: errorMessage, success: false });
  }
}
export {
  getUserDetailsHandler,
  uploadPicHanlder,
  updateUserCredentialsHandler,
  deleteUserProfileHandler,
};
