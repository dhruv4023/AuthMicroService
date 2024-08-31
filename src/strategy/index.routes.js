import express from 'express';
const router = express.Router();

import googleRoutes from './oauth/google.login.routes.js';

router.use('/auth/google', googleRoutes);

// exporting router
export default router;
  