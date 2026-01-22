import express from 'express';
import * as authController from '../controllers/authController.js';
import { validateRegister, validateLogin, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, authController.register);
router.post('/login', validateLogin, handleValidationErrors, authController.login);
router.post('/logout', authController.logout);

export default router;