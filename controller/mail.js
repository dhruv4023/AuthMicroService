import nodemailer from "nodemailer";
// Controller function to send an OTP (One-Time Password) email
export const sendMail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Define the subject and text of the email
    const subject = "OTP for Login " + otp;
    const text = "Thank you for signing up.";

    // Create a Nodemailer transporter with Gmail service
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SENDER_EMAIL, // Use the sender's email address from environment variables
        pass: process.env.SENDER_PASSWORD, // Use the sender's email password from environment variables
      },
    });

    // Define email options including sender, recipient, subject, and text
    const mailOptions = {
      from: process.env.SENDER_EMAIL, // Sender's email address
      to: email, // Recipient's email address
      subject: subject, // Email subject
      text: text, // Email body text
    };

    // Send the email using the Nodemailer transporter
    if (Boolean(process.env.DEBUG)) console.log(otp);
    else await transporter.sendMail(mailOptions);
    // Send a success response if the email is sent successfully
    // res.send("Email sent successfully");
    res.status(200).send({msg:"Email sent successfully"});
  } catch (error) {
    // Handle errors and send a 500 (Internal Server Error) response if email sending fails
    console.error(error);
    res.status(500).send({msg:"Email sending failed"});
  }
};
