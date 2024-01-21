import jwt from "jsonwebtoken";
import config from "../config/config.js";
import generateJWTToken from "../middleware/generateToken.js";
import { sendEmailMail } from "./mail.service.js";

import db from "../models/index.js";
const { VerificationLink, Users } = db

export const sendVerificationLink = async (userData) => {

    const { firstName, lastName, email, username } = userData;
    const expMin = 10;
    const token = generateJWTToken({ data: { userData }, expMin: expMin })

    if (!await VerificationLink.create({ token, username })) {
        throw new Error('Verification token storing error');
    } 
    const verificationLink = `${config.app_base_url}/mail/verifylink/${username}`;

    const emailSubject = "Verify Your Email";
    const emailBody = `Hi ${firstName} ${lastName},\n\n` +
        `Please click the following link to verify your email:\n` +
        `${verificationLink}\n\n` +
        `This link will expire in ${expMin} minutes.`;

    // console.log(verificationLink)
    try {
        // Send the verification email
        console.log("sent...")
        await sendEmailMail({
            recipient: email,
            subject: emailSubject,
            body: emailBody,
        });
        console.log("sent")
        return ("Verification email sent successfully");
    } catch (error) {
        console.log(error)
        return "Error sending verification email";
        throw new Error("Error sending verification email");
    }
};


export const verifyLink = async (username) => {
    try {
        const token = (await VerificationLink.findOne({ username: username })).token;
        if (!token) {
            throw new Error('Verification token not found');
        }

        const data = jwt.verify(token, config.jwt_secret);
        new Users(data.userData).save();

    } catch (error) {
        console.error('Error verifying link:', error);
        throw new Error('Error verifying link');
    }
};