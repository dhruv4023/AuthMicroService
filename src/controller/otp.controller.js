import generateJWTToken from "../middleware/generateToken.js";
import { sendEmailMail } from "../services/mail.service.js";

// Controller function to send an OTP (One-Time Password) email
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const { userId } = req.tokenData;

    const otp = generateSixDigitOTP(); // Replace 'generateOTP()' with your OTP generation logic

    // Define the subject and text of the email
    const subject = `OTP for Login: ${otp}`;
    const text = `Your OTP for login is: ${otp}. Thank you for signing up.`;
    const token = generateJWTToken({
      expMin: 10,
      data: { userId: userId, otp: otp },
      secretKey: process.env.JWT_SECRECT,
    });
    // Send a success response if the email is sent successfully
    if (Boolean(process.env.DEBUG)) console.log(otp);
    else
      await sendEmailMail({ recepient: email, subject: subject, body: text });
    // console.log(
    // );
    res
      .status(200)
      .send({ msg: "OTP sent successfully to " + email, token: token });
  } catch (error) {
    // Handle errors and send a 500 (Internal Server Error) response if email sending fails
    console.error(error);
    res.status(500).send({ msg: "OTP sending failed" });
  }
};
const generateSixDigitOTP = () => {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body; // OTP entered by the user
    const { userId, otp: sentOtp } = req.tokenData; // OTP sent to the user

    if (otp === sentOtp) {
      // If the entered OTP matches the sent OTP, it's a successful verification
      res.status(200).send({ message: "OTP verified successfully" });
    } else {
      // If the entered OTP does not match the sent OTP, it's an unsuccessful verification
      res.status(401).send({ message: "Wrong OTP Entered" });
    }
  } catch (error) {
    // Handle errors and send a 500 (Internal Server Error) response if an unexpected error occurs
    console.error(error);
    res.status(500).send({ message: "Server error occurred" });
  }
};
