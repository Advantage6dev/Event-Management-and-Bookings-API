import { Booking, CreatedBooking } from '../model/bookings.model.js';
import { Event } from '../model/events.model.js';
import {
  writeEventsData,
  readEventsData,
  writeBookingsData,
  readBookingsData,
} from '../utils/file.utils.js';
import { getAllEvents } from './events.services.js';

export async function getAllBooking(): Promise<Booking[]> {
  const bookings = await readBookingsData();
  return JSON.parse(bookings) as Booking[];
}

export async function getBookingById(id: number): Promise<Booking | undefined> {
  const bookings = await getAllBooking();
  const booking = bookings.find((booking) => booking.id === id);
  return booking;
}

export async function createBooking(
  bookingData: CreatedBooking,
): Promise<Booking | undefined> {
  const bookings = await getAllBooking();
  const events = (await getAllEvents()) as Event[];
  const event = events.find((event) => event.id === bookingData.eventId);
  if (!event) {
    throw new Error('Events not Found');
  }
  if (bookingData.numberOfSeat > event.availableSeats) {
    throw new Error(
      `Only ${event.availableSeats} seat(s) are available for this event`,
    );
  }
  const newId =
    bookings.length > 0
      ? Math.max(...bookings.map((booking) => booking.id)) + 1
      : 1;

  const booking = {
    id: newId,
    eventId: bookingData.eventId,
    customerName: bookingData.customerName,
    customerEmail: bookingData.customerEmail,
    numberOfSeat: bookingData.numberOfSeat,
    createdAt: new Date().toISOString(),
  };
  event.availableSeats -= bookingData.numberOfSeat;

  bookings.push(booking);
  await writeBookingsData(bookings);
  await writeEventsData(events);

  return booking;
}

export async function deleteBooking(id: number): Promise<Booking | undefined> {
  const bookings = await getAllBooking();
  const bookingIndex = bookings.findIndex((booking) => booking.id === id);
  const deletedBooking = bookings[bookingIndex];
  if (!bookingIndex) {
    throw new Error('Id not found');
  }
  const events = (await getAllEvents()) as Event[];
  const event = events.find((event) => event.id === deletedBooking.eventId);
  if (!event) {
    throw new Error('Event not found');
  }

  bookings.splice(bookingIndex, 1);
  event.availableSeats += deletedBooking.numberOfSeat;

  writeEventsData(events);
  writeBookingsData(bookings);

  return deletedBooking;
}
