import express from 'express';
import user_api from "./user/index.js"
import mail_api from "./mail/index.js"

const router = express.Router();

router.use("", user_api)
router.use("", mail_api)

export default router;
