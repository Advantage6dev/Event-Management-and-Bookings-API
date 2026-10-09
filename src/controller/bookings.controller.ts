import { Request, Response, NextFunction } from 'express';
import {
  getAllBooking,
  getBookingById,
  deleteBooking,
  createBooking,
} from '../services/bookings.services.js';
import { CreatedBooking } from '../model/bookings.model.js';

function getId(req: Request) {
  return Number(req.params.id);
}

export async function getBookings(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const bookings = await getAllBooking();
    res.status(200).json({
      success: true,
      message: 'All Bookings found',
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
}

export async function getBooking(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = getId(req);
    const booking = await getBookingById(id);
    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Booking found successfully',
      data: booking,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteABooking(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = getId(req);
    const booking = await deleteBooking(id);
    if (!booking) {
      res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Bookings deleted',
      data: booking,
    });
  } catch (err) {
    next(err);
  }
}

export async function createABooking(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const body = req.body as CreatedBooking;
    const booking = await createBooking(body);
    res.status(201).json({
      success: true,
      message: 'Bookings Created',
      data: booking,
    });
  } catch (err) {
    next(err);
  }
}
