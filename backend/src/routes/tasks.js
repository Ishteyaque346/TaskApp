import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { validateTask, handleValidationErrors } from '../middleware/validation.js';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', taskController.getTasks);
router.post('/', validateTask, handleValidationErrors, taskController.createTask);
router.put('/:id', validateTask, handleValidationErrors, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;