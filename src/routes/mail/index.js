import express from 'express';
const router = express.Router();

// importing base routes
import mailRoutes from './mail.routes.js';

// defining routes
router.use('/mail', mailRoutes);
// exporting router
export default router;
  