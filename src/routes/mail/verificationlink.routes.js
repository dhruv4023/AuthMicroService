// Import the necessary dependencies
import express from "express";
import { verifyVerificationLink } from "../../controller/verificationLink.controller.js";

// Create a new Express Router
const routes = express.Router();

routes.get("/verifylink/:username", verifyVerificationLink);

// Export the router for use in other parts of the application
export default routes;
