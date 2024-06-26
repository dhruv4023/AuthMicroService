import mongoose from 'mongoose';
import db from '../models/index.js';
import RESPONSE from '../helpers/response.helper.js';
import { uploadFile } from '../helpers/upload_file_to_cloudinary.helper.js';
import isValidData from '../helpers/validation/data_validator.js';
import { getPaginatedResponse, getPaginationMetadata } from '../helpers/pagination.helper.js';

const { Users } = db;

export const getOtherUsers = async (req, res) => {
    try {
        const { tokenData: { userId }, query: { page = 0, limit = 5 } } = req
        const { startIndex } = getPaginationMetadata(req.query);

        // Your logic to fetch other users goes here...
        const otherUsers = await Users.find({ _id: { $ne: userId } }).skip(startIndex).limit(limit);;

        const totalCount = otherUsers.length;
        const paginatedResponse = getPaginatedResponse(otherUsers, page, limit, totalCount);
        // Example response when fetching other users succeeds
        return RESPONSE.success(res, 1011, paginatedResponse);
    } catch (error) {
        console.error('Error fetching other users:', error);
        return RESPONSE.error(res, 9999);
    }
};


export const getUsers = async (req, res) => {

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
        email: 'required|email',
    })

    if (validationErr)
        return RESPONSE.error(res, validationErr);

    try {

        const _file = req.file; // Get the uploaded file, if any
        const {
            tokenData: { userId: _id, username },
            body: { firstName, lastName, about, email }
        } = req;

        const location = {
            state: req.body["location.state"],
            city: req.body["location.city"],
            pincode: req.body["location.pincode"],
        };

        const user = await Users.findOne({ username, _id });

        if (!user)
            return RESPONSE.error(res, 1027, 400);

        // Check if the provided email is already used by another user
        if (user.email !== email && (await Users.findOne({ email }))) {
            return RESPONSE.error(res, 1004)
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
            { _id },
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
        const updatedUser = await Users.findOne({ _id });
        RESPONSE.success(res, 1007, { user: updatedUser });
    } catch (error) {
        console.log(error)
        // Send a 500 (Internal Server Error) response with an error message if there's an error
        RESPONSE.error(res, 9999, 500, error)
    }
};
