import mongoose from "mongoose";
import Users from "../models/Users.js"; // Import the Users model

// Controller function to get user information by UID (User ID or username)
export const getUsers = async (req, res) => {
  try {
    const { UID } = req.params;
    
    // Check if UID is a valid ObjectId (User ID)
    if (mongoose.isValidObjectId(UID)) {
      // Find a user by their User ID
      const user = await Users.find({ _id: UID });

      // Return the found user data as a JSON response
      res.status(200).json(user);
    } else {
      // Find a user by their username
      const user = await Users.findOne({ username: UID });

      // Return the found user data as a JSON response
      res.status(200).json(user);
    }
  } catch (error) {
    // Handle errors and return a 404 status if the user is not found
    res.status(404).json(null);
  }
};
