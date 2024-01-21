import express from 'express';
const router = express.Router();

// importing base routes
import verificationlinkRoutes from './verificationlink.routes.js'

// defining routes
router.use('/mail', verificationlinkRoutes);
// exporting router
export default router;
