import nodemailer from "nodemailer";
import config from "../config/config.js";

export const sendEmailMail = async ({ recipient, subject, body }) => {
  // Create a Nodemailer transporter with Gmail service
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: config.mail.sender_email, // Use the sender's email address from environment variables
      pass: config.mail.sender_password, // Use the sender's email password from environment variables
    },
  });

  // Define email options including sender, recipient, subject, and text
  const mailOptions = {
    from: process.env.SENDER_EMAIL, // Sender's email address
    to: recipient, // Recipient's email address
    subject: subject, // Email subject
    text: body, // Email body text
  };

  // Send the email using the Nodemailer transporter
  return await transporter.sendMail(mailOptions);
};
