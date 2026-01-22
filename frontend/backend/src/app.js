import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { getConfig } from './config/environment.js';

const config = getConfig();
const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true
}));

// Parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

export default app;