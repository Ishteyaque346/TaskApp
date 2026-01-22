import app from './src/app.js';
import { connectDB } from './src/config/database.js';
import { getConfig } from './src/config/environment.js';

const config = getConfig();

const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.PORT, () => {
      console.log(`✓ Server running on port ${config.PORT}`);
      console.log(`✓ Environment: ${config.NODE_ENV}`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();