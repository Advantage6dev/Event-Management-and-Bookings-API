export type EventCategory = 'tech' | 'business' | 'music' | 'education';

export type Event = {
  id: number;
  title: string;
  description: string;
  category: EventCategory;
  location: string;
  date: string;
  capacity: number;
  availableSeats: number;
  createdAt: string;
};

export type CreatedEvent = {
  title: string;
  description: string;
  category: EventCategory;
  location: string;
  date: string;
  capacity: number;
};

export type UpdatedEvent = Partial<CreatedEvent>;
