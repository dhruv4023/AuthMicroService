import { sendEmailMail } from "../services/mail.js";

// Controller function to send an OTP (One-Time Password) email
export const sendMail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Define the subject and text of the email
    const subject = "OTP for Login " + otp;
    const text = "Thank you for signing up.";
    // Send a success response if the email is sent successfully
    if (Boolean(process.env.DEBUG)) console.log(otp);
    else
      await sendEmailMail({ recepient: email, subject: subject, body: text });
    // console.log(
    // );
    res.status(200).send({ msg: "Email sent successfully" });
  } catch (error) {
    // Handle errors and send a 500 (Internal Server Error) response if email sending fails
    console.error(error);
    res.status(500).send({ msg: "Email sending failed" });
  }
};
