// Import the necessary dependencies
import express from "express";
import { sendOTP, verifyOTP } from "../controller/otp.js";
import { verifyToken } from "../middleware/auth.js";

// Create a new Express Router
const routes = express.Router();

// Define a POST route to send an OTP (One-Time Password) email
routes.post("/sendotp/", verifyToken, sendOTP);
routes.post("/verifyotp/", verifyToken, verifyOTP);

// Export the router for use in other parts of the application
export default routes;
