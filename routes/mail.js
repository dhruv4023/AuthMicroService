// Import the necessary dependencies
import express from "express";
import { sendMail } from "../controller/mail.js";

// Create a new Express Router
const routes = express.Router();

// Define a POST route to send an OTP (One-Time Password) email
routes.post("/sendotp/", sendMail);

// Export the router for use in other parts of the application
export default routes;
