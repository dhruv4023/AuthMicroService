import mongoose from 'mongoose';
import db from '../models/index.js';
import RESPONSE from '../helpers/response.helper.js';
import { uploadFile } from '../helpers/upload_file_to_cloudinary.helper.js';
import isValidData from '../helpers/validation/data_validator.js';

const { Users } = db;

// Controller function to get user information by uid (User ID or username)
export const getUsers = async (req, res) => {

    const validationErr = await isValidData(req.params, {
        uid: 'required|isEmailOrUsername',
    })

    if (validationErr)
        return RESPONSE.error(res, validationErr);

    try {
        const { params: { uid } } = req;

        const user = await Users.findOne(mongoose.isValidObjectId(uid)
            ? { _id: uid } : {
                $or: [{ email: uid }, { username: uid }],
            }
        );
        // If user doesn't exist, rollback the transaction and return a 400 Bad Request response
        if (!user) {
            return RESPONSE.error(res, 1027, 400);
        }

        RESPONSE.success(res, 1006, { user });
    } catch (error) {
        // Handle errors and return a 500 (Internal Server Error) status with an error message
        RESPONSE.error(res, 9999, 500, error)
    }
};

// Controller function to update user data
export const updateUserData = async (req, res) => {

    const validationErr = await isValidData(req.body, {
        firstName: 'required|string|min:2|max:20|nameWithoutNumbers',
        lastName: 'required|string|min:2|max:20|nameWithoutNumbers',
        username: 'required|string|min:3|max:20',
        email: 'required|email',
    })

    if (validationErr)
        return RESPONSE.error(res, validationErr);

    try {

        const _file = req.file; // Get the uploaded file, if any
        const {
            tokenData: { userId: id },
            body: { firstName, lastName, about, username, email }
        } = req;

        const location = {
            state: req.body["location.state"],
            city: req.body["location.city"],
            pincode: req.body["location.pincode"],
        };

        const user = await Users.findOne({ username, id }); // Find the user by their username and id

        if (!user)
            return RESPONSE.error(res, 1027, 400);

        // Check if the provided email is already used by another user
        if (user.email !== email && (await Users.findOne({ email }))) {
            return res.status(400).json({ msg: "Email already used!" });
        }

        // upload image to cloudinary
        let filePath = user?.picPath;
        if (_file) {
            const fileData = await uploadFile({
                file: _file,
                newImgFileName: "profileImg",
                dirAddress: "Users/" + user.username,
            });
            filePath = fileData.public_id;
        }
        
        // Update the user's data in the database
        await Users.findOneAndUpdate(
            { id },
            {
                $set: {
                    firstName,
                    lastName,
                    about,
                    location,
                    picPath: filePath,
                },
            }
        );
        const updatedUser = await Users.findOne({ id });
        RESPONSE.success(res, 1007, { user: updatedUser });
    } catch (error) {
        // Send a 500 (Internal Server Error) response with an error message if there's an error
        RESPONSE.error(res, 9999, 500, error)
    }
};
