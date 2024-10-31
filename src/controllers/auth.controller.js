import mongoose from "mongoose";
import db from '../models/index.js';
import RESPONSE from '../helpers/response.helper.js';
import generateJWTToken, { generateHashWithOTPAndSecret, generateVerificationToken } from '../helpers/generate_token.helper.js';
import { comparePassword, hashPassword } from '../helpers/bcrypt_password.helper.js';
import isValidData from "../helpers/validation/data_validator.js";
import { sendVerificationEmail } from "../services/verification_link.service.js";
import { uploadFile } from "../helpers/upload_file_to_cloudinary.helper.js";
import passport from "passport";
const { Users } = db;

// Controller for user registration
export const registerControl = async (req, res) => {

  const location = {
    state: req.body["location.state"],
    city: req.body["location.city"],
    pincode: req.body["location.pincode"],
  };

  const validationErr = await isValidData({ ...req.body, ...location }, {
    firstName: 'required|string|min:2|max:20|nameWithoutNumbers',
    lastName: 'required|string|min:2|max:20|nameWithoutNumbers',
    username: 'required|string',
    email: 'required|email',
    password: 'required|password',
    about: 'string',
    state: 'string',
    city: 'string',
    pincode: 'sixDigitNumber'
  });

  if (validationErr)
    return RESPONSE.error(res, validationErr, 400);

  try {
    const _file = req.file; // Get the uploaded file, if any
    const { body: { firstName, lastName, username, email, password, about } } = req; // Extract user registration data

    // Check if a user with the same email already exists
    const user = await Users.findOne({ email });

    // If user with the same email exists, return a 400 Bad Request response
    if (user)
      return RESPONSE.error(res, 1003, 400);

    let filePath = null;
    if (_file) {
      const fileData = await uploadFile({
        file: _file,
        newImgFileName: "profileImg",
        dirAddress: "Users/" + username,
      });
      filePath = fileData.public_id;
    }

    const token = generateVerificationToken(); // Implement a function to generate a verification token

    // Create a new User document
    const newUser = new Users({
      firstName,
      lastName,
      username,
      email,
      about,
      picPath: filePath,
      password: hashPassword(password),
      location,
      verificationToken: token,
    });

    await newUser.save();

    // Send verification email with the token
    await sendVerificationEmail({ recipient: newUser.email, token }); // Implement this function to send an email with the verification token

    // Send a success response
    RESPONSE.success(res, 1008);
  } catch (error) {
    // console.log(error)
    // If an error occurs during registration, log the error and send a 500 Internal Server Error response
    RESPONSE.error(res, 9999, 500, error);
  }
};

// Endpoint for verifying user with token
export const verifyUserAccount = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await Users.findOne({ 'verificationToken': token });

    if (!user) {
      return RESPONSE.error(res, 9000, 400);
    }

    // Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined; // Clear verification token
    user.expiresAt = undefined; // Clear verification token
    await user.save();

    // Send a success response
    RESPONSE.success(res, 200, 'User verified successfully');
  } catch (error) {
    // console.log(error)
    RESPONSE.error(res, 9999, 500, error);
  }
};

// Controller for user login
export const loginControl = async (req, res) => {

  const validationErr = await isValidData(req.body, {
    uid: 'required|isEmailOrUsername',
    password: 'required|password',
  })

  if (validationErr)
    return RESPONSE.error(res, validationErr);

  try {
    // Extracting user login data from the request body
    const { body: { uid, password, unlimitedTokenTime } } = req;
    try {
      // Retrieve user data for the provided username or email
      const user = await Users.findOne(mongoose.isValidObjectId(uid)
        ? { _id: uid }
        : {
          $or: [{ email: uid }, { username: uid }],
        }
      ).select('+verified +password');


      // If user doesn't exist, rollback the transaction and return a 400 Bad Request response
      if (!user)
        return RESPONSE.error(res, 1027, 400);

      if (!user.verified)
        return RESPONSE.error(res, 1012, 400);

      // If passwords don't match, rollback the transaction and return a 400 Bad Request response
      if (!comparePassword(password, user.password))
        return RESPONSE.error(res, 1005, 400);

      // Generate a JWT token for the authenticated user
      const token = generateJWTToken({ data: { userId: user._id, username: user.username, role: user.role }, shouldExpire: unlimitedTokenTime ? false : true });

      // Hide the password in the user object before sending the response
      user.password = undefined;
      user.verified = undefined;

      req.session.user = {
        userId: user._id,
        token
      };

      // Send a success response with the JWT token and user details
      RESPONSE.success(res, 1002, { token, user });
    } catch (error) {
      throw error; // Re-throw the error to be caught by the outer catch block
    }
  } catch (error) {
    // If an error occurs during login, log the error and send a 500 Internal Server Error response
    RESPONSE.error(res, 9999, 500, error);
  }
};

// Controller function to get user names
export const checkUsernameAvalibility = async (req, res) => {
  try {
    const { params: { username } } = req;
    const isAvailable = await Users.findOne({ username: username });
    // console.log(isAvailable,isAvailable==undefined)
    RESPONSE.success(res, 1009, { isAvailable: isAvailable == undefined });
  } catch (error) {
    RESPONSE.error(res, 9999, 500, error);
  }
};

// Controller function to change user password
export const changePasswordController = async (req, res) => {

  const validationErr = await isValidData(req.body, {
    email: 'required|email',
    password: 'required|password',
    otp: "required|string"
  })

  if (validationErr)
    return RESPONSE.error(res, validationErr);

  try {
    const { body: { email, password, otp } } = req; // Extract email and new password from the request body

    const user = await Users.findOne({ email, verificationToken: generateHashWithOTPAndSecret(otp) }); // Find the user by their email

    if (!user)
      return RESPONSE.error(res, 6004, 400);

    await Users.findOneAndUpdate({ email }, { $set: { password: hashPassword(password), verificationToken: null } }); // Update the user's password in the database

    RESPONSE.success(res, 1010);
  } catch (error) {
    RESPONSE.error(res, 9999, 500, error);
  }
};



export const googleAuth = async (req, res, next) => {
  // Dynamically build the authentication URL with additional query parameters
  const baseurl = req.query.baseurl || "http://localhost:5001";
  // Use `passReqToCallback` in the strategy to access this later if needed
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: JSON.stringify({ baseurl }) // Pass the baseurl as a state parameter
  })(req, res, next);
}

export const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');  // Clear the session cookie
      res.status(200).json({ "success": true, message: "logout successfully" });
    });
  });
}


export const getSession = async (req, res) => {
  try {
    if (req.session.user) {
      const { userId, token } = req.session.user;
      const user = await Users.findOne({ _id: userId });
      RESPONSE.success(res, 1002, { token, user });
    } else {
      // If not authenticated, send a 401 Unauthorized response
      RESPONSE.error(res, 9999, 401);
    }
  } catch (error) {
    console.log(error)
    RESPONSE.error(res, 9999, 500, error);
  }
};
