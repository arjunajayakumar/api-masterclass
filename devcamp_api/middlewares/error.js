import { ErrorResponse } from '../utils/errorResponse';

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  // console.log(err);

  // Moongoose invalid objectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate key, item already exists';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidatonError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
    console.log(err.errors);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, err: error.message || 'Server Error' });
};
