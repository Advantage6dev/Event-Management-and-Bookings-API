export type Booking = {
  id: number;
  eventId: number;
  customerName: string;
  customerEmail: string;
  numberOfSeat: number;
  createdAt: string;
};

export type CreatedBooking = {
  eventId: number;
  customerName: string;
  customerEmail: string;
  numberOfSeat: number;
  createdAt: string;
};
