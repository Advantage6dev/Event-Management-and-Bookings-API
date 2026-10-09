import { Router } from 'express';
import {
  getBookings,
  getBooking,
  deleteABooking,
  createABooking,
} from '../controller/bookings.controller.js';
import { param, body } from 'express-validator';
import { handleValidationError } from '../middleware/validator.middleware.js';

const router = Router();

const validid = param('id')
  .isInt({ min: 1 })
  .withMessage('Id must not be negative integer or less than 0');
const validEventId = body('eventId')
  .isInt({ min: 1 })
  .withMessage('eventId must not be negative integer or less than 0');
const validCustomerName = body('customerName')
  .trim()
  .notEmpty()
  .withMessage('Name must not be empty');
const validCustomerEmail = body('customerEmail')
  .trim()
  .notEmpty()
  .withMessage('Email must not be empty');
const validSeats = body('numberOfSeat')
  .isInt({ min: 1 })
  .withMessage('Number of seats must not be negative integer or less than 0');

router.get('/', getBookings);
router.get('/:id', validid, handleValidationError, getBooking);
router.post(
  '/',
  [validEventId, validCustomerEmail, validCustomerName, validSeats],
  handleValidationError,
  createABooking,
);
router.delete('/:id', validid, handleValidationError, deleteABooking);

export default router;
