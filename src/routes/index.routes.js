import express from 'express';
import auth_user_api from "./auth/index.js"
import mail_api from "./mail/index.js"

const router = express.Router();

router.use("", auth_user_api)
router.use("", mail_api)

export default router;
