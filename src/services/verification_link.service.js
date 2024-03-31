import config from "../config/config.js";
import { sendEmailMail } from "./mail.service.js";

export const sendVerificationEmail = async ({ recipient, token }) => {
    // console.log(token)
    const subject = "Account Verification";
    const body = `Dear user,\n\nPlease click on the following link to verify your account:\n\nVerification Link: <${config.app_base_url}/auth/verify/${token}>\n\nThis link will expire in 10 minutes.\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nYour App Team`;

    try {
        if (config.DEGUB)
            console.log(token)
        else
            await sendEmailMail({ recipient, subject, body });
    } catch (error) {
        throw new Error("Failed to send verification email");
    }
};

