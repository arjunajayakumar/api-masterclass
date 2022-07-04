import { BootcampModel } from '../models/bootcamp';
// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access public

const getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await BootcampModel.find();
    res.status(201).json({ success: true, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};

// @desc Get a single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access public

const getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootcampModel.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc create a bootcamp
// @route POST /api/v1/bootcamps
// @access private
const createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await BootcampModel.create(req.body);

    res.status(201).json({
      sucess: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};

// @desc update a bootcamp
// @route PUT /api/v1/bootcamps/:id
// @access private
const updateBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await BootcampModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};

// @desc delete a bootcamp
// @route DELETE /api/v1/bootcamps
// @access private
const deleteBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await BootcampModel.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
};

export {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootCamp,
};
