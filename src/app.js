// setting up express app with right middleware here

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from '#routes/auth.routes.js';
import usersRoutes from '#routes/users.routes.js';
import securityMiddleware from '#middleware/security.middleware.js';

const app = express();

app.use(helmet());
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

app.get('/health', (req, res) => {

  // res.status(200).json({
  //   status: 'OK',
  //   timestamp: new Date().toISOString(),
  //   uptime: process.uptime()
  // });

  res.status(200).json({ status: 'OK' });
 
});

app.use(securityMiddleware);

app.get('/', (req, res) => {
  logger.info('LOGGERS - - - Hello Acquisitions API!');

  res.status(200).send('Welcome to the Acquisitions API!');
});

app.get('/api', (req, res) => {
  
  res.status(200).json({
    message: 'Acquisitions API is working!',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested URL ${req.originalUrl} was not found on this server.`
  });
});

app.use((err, req, res) => {
  logger.error('Unhandled error:', err);

  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred',
  });
});

export default app;
