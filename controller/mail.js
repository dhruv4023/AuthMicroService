import nodemailer from "nodemailer";

export const sendMail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // console.log(email,otp)
    const subject = "OTP for Login " + otp;
    const text="Thank you for sign up."
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.sender_email,
        pass: process.env.sender_password,
      },
    });

    // Define email options
    const mailOptions = {
      from: "abzxy50312@gmail.com",
      to:email,
      subject:subject,
      text:text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Email sending failed");
  }
};
