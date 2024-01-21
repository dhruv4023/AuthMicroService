import express from "express";

import {
  getUsers,
} from "../../controller/user.controller.js";

// Create a new Express Router
const routes = express.Router();

// Define a GET route to fetch user data by UID
routes.get("/get/:UID", getUsers);

// Export the router for use in other parts of the application
export default routes;
