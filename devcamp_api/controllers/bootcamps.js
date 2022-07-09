import { BootcampModel } from '../models/bootcamp';
import { ErrorResponse } from '../utils/errorResponse';
import { asyncHandler } from '../middlewares/asyncHandler';
import { geocoder } from '../utils/geocoder';

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access public
const getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  let queryStr = JSON.stringify({ ...req.query });

  query = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  const bootcamps = await BootcampModel.find(JSON.parse(query));

  res
    .status(201)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
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

// @desc get all bootcamps within a radius
// @route GET /api/v1/radius/:zipcode/:distance
// @access private
const getBootCampsInRaduis = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calculate radius
  const radius = distance / 6371;

  const bootcamps = await BootcampModel.find({
    location: {
      $geoWithin: { $center: [[lng, lat], radius] },
    },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

export {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootCamp,
  getBootCampsInRaduis,
};
