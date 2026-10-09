import {
  CreatedEvent,
  Event,
  EventCategory,
  UpdatedEvent,
} from '../model/events.model.js';
import { readEventsData, writeEventsData } from '../utils/file.utils.js';

export async function getAllEvents(): Promise<Event[]> {
  const events = await readEventsData();
  return JSON.parse(events) as Event[];
}

export async function getEventById(id: number): Promise<Event | undefined> {
  const events = await getAllEvents();
  const event = events.find((event) => event.id === id);
  return event;
}

export async function CreateAnEvent(data: CreatedEvent): Promise<Event> {
  const events = await getAllEvents();
  const newId =
    events.length > 0 ? Math.max(...events.map((event) => event.id)) + 1 : 1;
  const newEvent: Event = {
    id: newId,
    title: data.title,
    description: data.description,
    category: data.category,
    location: data.location,
    date: data.date,
    capacity: data.capacity,
    availableSeats: data.capacity,
    createdAt: new Date().toISOString(),
  };
  events.push(newEvent);
  await writeEventsData(events);
  return newEvent;
}

export async function updateEvent(
  id: number,
  data: UpdatedEvent,
): Promise<Event> {
  const events = await getAllEvents();
  const eventIndex = events.findIndex((event) => event.id === id);

  const update = {
    ...events[eventIndex],
    ...data,
  };

  await writeEventsData(events);

  return events[eventIndex];
}

export async function filterEvent(
  category: EventCategory,
  location: string,
  search: string,
  sort: 'asc' | 'desc',
): Promise<Event[]> {
  let events = await getAllEvents();
  if (category) {
    events = events.filter((event) => event.category === category);
  }
  if (location) {
    events = events.filter(
      (event) =>
        event.location.toLocaleLowerCase() === location.toLocaleLowerCase(),
    );
  }
  if (search) {
    events = events.filter(
      (event) =>
        event.title.toLocaleLowerCase() === search.toLocaleLowerCase() ||
        event.description.toLocaleLowerCase() === search,
    );
  }
  if (sort) {
    events.sort((a, b) => {
      const firstDate = new Date(a.date).getTime();
      const secondDate = new Date(b.date).getTime();

      return sort === 'asc' ? firstDate - secondDate : secondDate - firstDate;
    });
  }

  return events;
}

export async function deleteEvent(id: number): Promise<Event | undefined> {
  const events = await getAllEvents();
  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return undefined;
  }

  const [deletedEvent] = events.splice(eventIndex, 1);
  await writeEventsData(events);

  return deletedEvent;
}
