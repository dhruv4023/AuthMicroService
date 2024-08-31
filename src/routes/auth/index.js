import express from 'express';
const router = express.Router();

// importing base routes
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';

// defining routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

// exporting router
export default router;
  