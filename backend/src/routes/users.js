import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

export default router;