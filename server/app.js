const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
// const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const teamRouter = require('./routes/teamRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES

// Enable CORS
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   // console.log(req.headers);
//   next();
// });

// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/teams', teamRouter);

// HANDLING UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
