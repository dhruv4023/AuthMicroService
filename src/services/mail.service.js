import nodemailer from "nodemailer";

export const sendEmailMail = async ({ recepient, subject, body }) => {
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
    to: recepient, // Recipient's email address
    subject: subject, // Email subject
    text: body, // Email body text
  };

  // Send the email using the Nodemailer transporter
  return await transporter.sendMail(mailOptions);
};
