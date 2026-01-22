import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';
import taskRoutes from './tasks.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

export default router;