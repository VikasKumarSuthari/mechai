import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

// Import Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';

// Import Middleware
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import authMiddleware from './middleware/auth.middleware.js';

// Import Database Connection
import connectDB from './config/database.js';
import { environment } from './config/environment.js';

class App {
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.connectDatabase();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  initializeMiddlewares() {
    // Security Middlewares
    this.app.use(helmet());
    this.app.use(cors({
      origin: environment.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // Request Processing Middlewares
    this.app.use(express.json({ limit: '10kb' }));
    this.app.use(express.urlencoded({ extended: true }));

    // Data Sanitization Middlewares
    this.app.use(mongoSanitize());
    this.app.use(xss());

    // Compression
    this.app.use(compression());

    // Rate Limiting
    const limiter = rateLimit({
      max: 100, // 100 requests
      windowMs: 15 * 60 * 1000, // 15 minutes
      message: 'Too many requests from this IP, please try again later'
    });
    this.app.use('/api', limiter);
  }

  connectDatabase() {
    connectDB();
  }

  initializeRoutes() {
    // Public Routes
    this.app.get('/', (req, res) => {
      res.json({ 
        message: 'Welcome to Mech AI API', 
        status: 'Healthy' 
      });
    });

    // API Routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/users', authMiddleware, userRoutes);
    this.app.use('/api/chats', authMiddleware, chatRoutes);
  }

  initializeErrorHandling() {
    // 404 Handler
    this.app.use(notFoundHandler);
    
    // Global Error Handler
    this.app.use(errorHandler);
  }

  listen() {
    const PORT = environment.PORT || 5000;
    this.app.listen(PORT, () => {
      console.log(`Server running in ${environment.NODE_ENV} mode on port ${PORT}`);
    });
  }
}

const app = new App();
app.listen();

export default app;