import { BootcampModel } from '../models/bootcamp';
import { ErrorResponse } from '../utils/errorResponse';
import { asyncHandler } from '../middlewares/asyncHandler';

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access public
const getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await BootcampModel.find();
  res
    .status(201)
    .json({ success: true, data: bootcamps, count: bootcamps.length });
});

// @desc Get a single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access public
const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootcampModel.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

// @desc create a bootcamp
// @route POST /api/v1/bootcamps
// @access private
const createBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootcampModel.create(req.body);
  res.status(201).json({
    sucess: true,
    data: bootcamp,
  });
});

// @desc update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access private
const updateBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootcampModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`)
    );
  }
});

// @desc delete a bootcamp
// @route DELETE /api/v1/bootcamps
// @access private
const deleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootcampModel.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data: {} });
});

export {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootCamp,
};
