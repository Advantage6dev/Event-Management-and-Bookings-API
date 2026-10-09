import { Request, Response, NextFunction } from 'express';
import {
  getAllEvents,
  getEventById,
  deleteEvent,
  filterEvent,
  CreateAnEvent,
  updateEvent,
} from '../services/events.services.js';
import {
  CreatedEvent,
  EventCategory,
  UpdatedEvent,
} from '../model/events.model.js';

function getId(req: Request): number {
  return Number(req.params.id);
}

export async function getEvents(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { category, location, search, sort } = req.query;
    const hasChecked =
      category !== undefined ||
      location !== undefined ||
      search !== undefined ||
      sort !== undefined;
    if (hasChecked) {
      const events = await filterEvent(
        category as EventCategory,
        location as string,
        search as string,
        sort as 'asc' | 'desc',
      );

      res.status(200).json({
        success: true,
        message:
          events.length === 0
            ? 'No events found matching your query'
            : 'Events found successfully',
        data: events,
      });
      return;
    }

    const events = await getAllEvents();
    res.status(200).json({
      success: true,
      message: 'All Event Found',
      data: events,
    });
  } catch (err) {
    next(err);
  }
}

export async function getSingleEvent(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = getId(req);
    const event = await getEventById(id);
    if (!event) {
      res.status(404).json({
        success: false,
        message: 'Event not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Event Found',
      data: event,
    });
  } catch (err) {
    next(err);
  }
}

export async function createEvent(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const body = req.body as CreatedEvent;
    const event = await CreateAnEvent(body);
    res.status(201).json({
      success: true,
      message: 'Event Created Successfully',
      data: event,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAnEvent(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const body = req.body as UpdatedEvent;
    const id = getId(req);
    const update = await updateEvent(id, body);
    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: update,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteAnEvent(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = getId(req);
    const eventDeleted = await deleteEvent(id);
    if (!eventDeleted) {
      res.status(404).json({
        success: false,
        message: 'Event not Found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Event has been deleted',
      data: eventDeleted,
    });
  } catch (err) {
    next(err);
  }
}
