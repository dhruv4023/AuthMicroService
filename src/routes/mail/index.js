import express from 'express';
const router = express.Router();

import mailRoutes from './otp.routes.js';

// defining routes
router.use('/mail', mailRoutes);

// exporting router
export default router;
  