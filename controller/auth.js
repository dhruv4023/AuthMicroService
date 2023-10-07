import bcrypt from "bcrypt";
import Users from "../models/Users.js"; // Import the Users model
import generateJWTToken from "../middleware/generateToken.js"; // Import JWT token generator
import { deleteFile, renameAndMove } from "../helper/fileDirOperations.js"; // Import file and directory operations

/* REGISTER USER */
export const registerControl = async (req, res) => {
  const _file = req.file; // Get the uploaded file, if any
  try {
    const { firstName, lastName, username, email, password, friends, about } =
      req.body; // Extract user registration data

    // Extract and structure user location data
    const location = {
      state: req.body["location.state"],
      district: req.body["location.district"],
      city: req.body["location.city"],
      pincode: req.body["location.pincode"],
    };

    // Check if a user with the same email already exists
    const user = await Users.findOne({ email: email });
    if (user) {
      _file && deleteFile(_file.path); // Delete the uploaded file
      return res.status(400).json({ msg: "User already exists!" });
    }

    // Generate a salt and hash the user's password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new User document
    const newUser = new Users({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      about: about,
      password: passwordHash,
      friends: friends,
      location: location,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // If a file is uploaded, rename and move it to a user-specific directory
    if (_file) {
      const picPath = renameAndMove("user/" + newUser._id, _file.originalname);
      await Users.findByIdAndUpdate(newUser._id, {
        $set: { picPath: picPath },
      });
    }

    // Send a success response
    res.status(200).json({ msg: "Saved successfully" });
  } catch (error) {
    _file && deleteFile(_file.path); // Delete the uploaded file in case of an error
    res.status(500).json({ msg: "Something went wrong" });
  }
};
// Controller function to get user names
export const getUserNames = async (req, res) => {
  try {
    const useNames = await Users.distinct("username");
    res.status(200).json(useNames); // Send a JSON response with a list of distinct usernames
  } catch (error) {
    res.status(404).json("Service not available"); // Send a 404 (Not Found) response if there's an error
  }
};

// Controller function for user login
export const loginControl = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from the request body
    const user = await Users.findOne({
      $or: [{ email: email }, { username: email }], // Check if the user exists based on email or username
    });

    if (!user)
      return res
        .status(400)
        .json({ exist: false, mess: "User doesn't exist!" }); // If the user doesn't exist, send a 400 (Bad Request) response

    const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the stored password hash

    if (!isMatch)
      return res
        .status(400)
        .json({ exist: false, mess: "Invalid credentials" }); // If the password doesn't match, send a 400 (Bad Request) response

    const token = generateJWTToken(user, process.env.JWT_SECRECT); // Generate a JWT token for the user
    delete user.password; // Remove the password from the user object

    res.status(200).json({ exist: true, token, user }); // Send a 200 (OK) response with the JWT token and user information
  } catch (error) {
    res.status(500).json({ exist: false, mess: "Failed to login" }); // Send a 500 (Internal Server Error) response if there's an error
  }
};

// Controller function to change user password
export const changePassControl = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and new password from the request body
    const user = await Users.findOne({ email: email }); // Find the user by their email

    if (!user)
      return res.status(400).json({ exist: false, msg: "User doesn't exist!" }); // If the user doesn't exist, send a 400 (Bad Request) response

    const salt = await bcrypt.genSalt(); // Generate a salt
    const passwordHash = await bcrypt.hash(password, salt); // Hash the new password
    await Users.findByIdAndUpdate(user._id, {
      $set: { password: passwordHash },
    }); // Update the user's password in the database

    res.status(200).json({ msg: "Password changed successfully!" }); // Send a 200 (OK) response upon successful password change
  } catch (error) {
    res.status(500).json({ msg: "Failed to change password" }); // Send a 500 (Internal Server Error) response if there's an error
  }
};

// Controller function to update user data
export const updateRegisteredData = async (req, res) => {
  const _file = req.file; // Get the uploaded file, if any
  try {
    const { id: _id } = req.params; // Extract user ID from the request parameters
    const {
      firstName,
      lastName,
      username,
      email,
      friends,
      about,
      location,
      socialLinks,
    } = req.body; // Extract user data from the request body

    const user = await Users.findOne({ username: _id }); // Find the user by their username

    // Check if the provided email is already used by another user
    if (user.email !== email && (await Users.findOne({ email: email }))) {
      _file && deleteFile(_file.path); // Delete the uploaded file
      return res.status(400).json({ msg: "Email already used!" });
    }

    // Update the user's data in the database
    await Users.findOneAndUpdate(
      { username: _id },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          about: about,
          friends: friends,
          location: location,
          socialLinks: socialLinks,
        },
      }
    );

    if (_file) {
      try {
        deleteFile("public/" + user.picPath); // Delete the user's old profile picture
      } catch (error) {}
      const picPath = renameAndMove("user/" + _id, _file.originalname); // Rename and move the new profile picture
      await Users.findOneAndUpdate(
        { username: _id },
        {
          $set: { picPath: picPath },
        }
      );
    }

    const userDt = await Users.findOne({ username: _id }); // Retrieve the updated user data
    res.status(200).json({ user: userDt }); // Send a 200 (OK) response with the updated user data
  } catch (error) {
    _file && deleteFile(_file.path); // Delete the uploaded file in case of an error
    res.status(500).json({ msg: "Server Error" }); // Send a 500 (Internal Server Error) response if there's an error
  }
};
