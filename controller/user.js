import { getUserData } from "../services/user.js";

// Controller function to get user information by UID (User ID or username)
export const getUsers = async (req, res) => {
  try {
    const { UID } = req.params;

    // Find a user by their User UID, email or username
    const user = await getUserData({ id: UID });

    // Return the found user data as a JSON response
    res.status(200).json(user);
  } catch (error) {
    // Handle errors and return a 500 status if the user is not found
    res.status(500).json("internal server error");
  }
};
