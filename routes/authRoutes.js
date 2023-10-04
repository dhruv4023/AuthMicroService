import express from "express";
import {
  registerControl,
  loginControl,
  changePassControl,
  getUserNames,
  updateRegisteredData,
} from "../controller/auth.js";
import upload from "../helper/fileUploder.js";
import { verifyToken } from "../middleware/auth.js";
const routes = express.Router();

routes.post("/register", upload.single("picPath"), registerControl);
routes.get("/usernames", getUserNames);
routes.post("/login", loginControl);
routes.post("/changepass", changePassControl);
routes.post(
  "/update/:id",
  verifyToken,
  upload.single("picPath"),
  updateRegisteredData
);

export default routes;
