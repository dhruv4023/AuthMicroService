// Import the necessary dependencies and controllers
import express from "express";
import { sendOTPController } from "../../controllers/otp.controller.js";

// Create a new Express Router
const router = express.Router();

// Define the route for sending OTP
router.post("/send-otp", sendOTPController);

// Export the router
export default router;
