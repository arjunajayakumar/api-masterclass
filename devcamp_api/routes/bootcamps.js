import express from 'express';
import {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootCamp,
  getBootCampsInRaduis,
} from '../controllers/bootcamps';

const router = express.Router();

router.route('/').get(getBootcamps).post(createBootcamps);
router.route('/radius/:zipcode/:distance').get(getBootCampsInRaduis);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootCamp);

export { router };
