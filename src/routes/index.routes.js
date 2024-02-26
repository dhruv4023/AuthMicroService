import express from 'express';
import user_api from "./user/index.js"

const router = express.Router();

router.use("", user_api)

export default router;
