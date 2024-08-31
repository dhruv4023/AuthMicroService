import express from "express";
import passport from "passport";
import { loginCallback } from "../../controllers/google.controller.js";

// Create a new Express Router
const routes = express.Router();

routes.get('/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    loginCallback
);

// Export the router for use in other parts of the application
export default routes;

