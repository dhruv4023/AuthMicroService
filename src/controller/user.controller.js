import { getUserData } from "../services/user.service.js";
import cache from "memory-cache"; // Import memory-cache

// Controller function to get user information by UID (User ID or username)
export const getUsers = async (req, res) => {
  try {
    const { UID } = req.params;

    // Check if the user data is already cached
    const cachedUser = cache.get(UID);
    if (cachedUser) {
      console.log("from cache")
      // If cached data exists, return it
      res.status(200).json(cachedUser);
    } else {
      console.log("from db")
      // If not cached, fetch the user data and store it in the cache
      const user = await getUserData({ id: UID });

      // Store the user data in the cache with a specified expiration time (e.g., 5 minutes)
      cache.put(UID, user, 5 * 60 * 1000); // 5 minutes in milliseconds

      // Return the user data as a JSON response
      res.status(200).json(user);
    }
  } catch (error) {
    // Handle errors and return a 500 status if the user is not found
    res.status(500).json("Internal server error");
  }
};
