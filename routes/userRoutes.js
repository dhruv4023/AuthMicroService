import express from "express";

import {
  getUsers,
} from "../controller/user.js";
const routes = express.Router();

routes.get("/get/:UID", getUsers);

export default routes;
