import RESPONSE from "../helpers/response.helper.js";
import { generateHashWithOTPAndSecret } from "../helpers/generate_token.helper.js";
import isValidData from "../helpers/validation/data_validator.js";
import { sendEmailMail } from "../services/mail.service.js";
import db from "./../models/index.js"

const { Users } = db

export const sendOTPController = async (req, res) => {

    const validationErr = await isValidData(req.body, {
        email: 'required|email',
    })

    if (validationErr)
        return RESPONSE.error(res, validationErr);

    try {
        const { body: { email } } = req; // Assuming the email is provided in the request body
        if (!email) {
            return RESPONSE.error(res, 6001, 404)
        }

        // Generate OTP (e.g., a random 6-digit number)
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        await Users.updateOne({ email }, { $set: { verificationToken: generateHashWithOTPAndSecret(otp) } })

        // Send OTP via email
        await sendEmailMail({
            recipient: email,
            subject: 'Your OTP for verification',
            body: `Your OTP is: ${otp}. Use this OTP to change your password.`
        });

        RESPONSE.success(res, 6002)
    } catch (error) {
        console.error('Error sending OTP:', error);
        RESPONSE.error(res, 6003, 500)
    }
};
