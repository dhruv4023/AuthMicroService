import express from "express";

import {
  getUsers, updateUserData,
} from "../../controllers/user.controller.js";
import { verifyTokenAndRole } from "../../middlewares/auth.js";
import upload from "../../middlewares/file_uploder.js";

// Create a new Express Router
const routes = express.Router();

// Define a GET route to fetch user data by UID
routes.get("/get/:uid", getUsers);

// Define a POST route to update user data by ID, with token verification and file upload
routes.put(
  "/update/",
  verifyTokenAndRole(['user', "admin"]), // Middleware to verify JWT token
  upload.single("picPath"), // Middleware for uploading a single file
  updateUserData
);

// Export the router for use in other parts of the application
export default routes;
