import jwt from 'jsonwebtoken';
import db from '../models/index.js';
const { Users } = db;

export const loginCallback = async (req, res) => {
  try {
    const { baseurl } = JSON.parse(req.query.state);

    const { email, firstName, lastName } = req.user;
    // Check if the user already exists
    let user = await Users.findOne({ email });
    if (!user) {
      // Create a new user if they do not exist
      user = await Users.create({ email, firstName, lastName, username: email.split("@")[0], verificationToken: undefined, expiresAt: null, verified: true });
    }

    // // Generate JWT token 
    const token = jwt.sign(
      { email: user.email, username: user.username, role: user.role, id: user._id },
      process.env.JWT_SECRET
    );


    req.session.user = {
      userId: user._id,
      token
    };
    // // Send response with JWT token

    res.redirect(baseurl)

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};



