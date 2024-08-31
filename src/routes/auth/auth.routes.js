// Import the necessary dependencies and controllers
import express from "express";
import {
  getSession,  registerControl,
  loginControl,
  getUserNames,
  changePassControl,
  verifyUserAccount,
  logout,
  googleAuth,
} from "../../controllers/auth.controller.js";

import upload from "../../middlewares/file_uploader.js";

// Create a new Express Router
const routes = express.Router();

// Define a POST route for user registration
routes.post("/register", upload.single("picPath"), registerControl);

// Define a POST route for user login
routes.post("/login", loginControl);

// Define a POST route for user login using google
routes.get('/google', googleAuth);


// Define a POST route for changing user passwords
routes.post("/change/password", changePassControl);

// Define a GET route to fetch user usernames
routes.get("/get/usernames", getUserNames);

// Define a GET route to verify user account via the verification link
routes.get("/verify/:token", verifyUserAccount);


routes.get("/get/session/",getSession);

routes.get("/logout", logout);

// Export the router for use in other parts of the application
export default routes;
