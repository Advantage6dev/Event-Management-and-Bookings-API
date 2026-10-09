import { Router } from 'express';
import {
  getEvents,
  getSingleEvent,
  updateAnEvent,
  deleteAnEvent,
  createEvent,
} from '../controller/event.controller.js';
import { param, body } from 'express-validator';
import { handleValidationError } from '../middleware/validator.middleware.js';

const router = Router();

const validId = param('id')
  .isInt({ min: 1 })
  .withMessage('ID must not be negative integer or less than 1');
const validTitle = body('title')
  .trim()
  .notEmpty()
  .withMessage('Title must not be empty');
const validDesc = body('description')
  .trim()
  .notEmpty()
  .withMessage('Description must not be empty');
const validCategory = body('category')
  .isIn(['tech', 'business', 'music', 'education'])
  .withMessage('Invalid category');
const validLocation = body('location')
  .trim()
  .notEmpty()
  .withMessage('Location must not be empty');
const validDate = body('date')
  .trim()
  .notEmpty()
  .withMessage('Date must not be empty');
const validCapacity = body('capacity')
  .trim()
  .notEmpty()
  .withMessage('Capacity must not be empty');
const validSeats = body('availableSeats')
  .trim()
  .notEmpty()
  .withMessage('Seats available must not be empty');

router.get('/', getEvents);
router.get('/:id', validId, handleValidationError, getSingleEvent);
router.post(
  '/',
  [
    validTitle,
    validCategory,
    validDesc,
    validLocation,
    validDate,
    validCapacity,
    validTitle,
  ],
  handleValidationError,
  createEvent,
);
router.put('/:id', validId, handleValidationError, updateAnEvent);
router.delete('/:id', validId, handleValidationError, deleteAnEvent);

export default router;
