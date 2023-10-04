import express from "express";

import {
   sendMail,
} from "../controller/mail.js";
const routes = express.Router();

routes.post("/sendotp/",sendMail);

export default routes;
