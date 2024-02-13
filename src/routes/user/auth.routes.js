// Import the necessary dependencies and controllers
import express from "express";
import {
  registerControl,
  loginControl,
  getUserNames,
  changePassControl,
} from "../../controllers/auth.controller.js";
import { verifyTokenAndRole } from "../../middlewares/auth.js";
import upload from "../../middlewares/file_uploder.js";

// Create a new Express Router
const routes = express.Router();

// Define a POST route for user registration
routes.post("/register", upload.single("picPath"), registerControl);

// Define a POST route for user login
routes.post("/login", loginControl);

// Define a POST route for changing user passwords
routes.put("/change/password", verifyTokenAndRole(['user', "admin"]), changePassControl);

// Define a GET route to fetch user usernames
routes.get("/get/usernames", getUserNames);

// Export the router for use in other parts of the application
export default routes;
