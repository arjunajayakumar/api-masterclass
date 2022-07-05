import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './config/db';
import color from 'colors';
import { errorHandler } from './middlewares/error';

// Route files
import { router } from './routes/bootcamps';

// Load env vars
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'developement') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/bootcamps', router);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);

// Handle unhandled promise rejections
process.on(`unhandledRejection`, (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // Close server & exit response
  server.close(() => process.exit(1));
});
