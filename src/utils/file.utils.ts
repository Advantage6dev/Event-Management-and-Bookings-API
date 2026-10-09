import { readFile, writeFile } from 'node:fs/promises';

const eventFilePath = new URL('../../data/events.json', import.meta.url);
const bookingFilePath = new URL('../../data/bookings.json', import.meta.url);

export async function readEventsData(): Promise<string> {
  const data = await readFile(eventFilePath, 'utf-8');
  return data;
}

export async function writeEventsData(data: unknown): Promise<void> {
  await writeFile(eventFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function readBookingsData(): Promise<string> {
  const data = await readFile(bookingFilePath, 'utf-8');
  return data;
}

export async function writeBookingsData(data: unknown): Promise<void> {
  await writeFile(bookingFilePath, JSON.stringify(data, null, 2), 'utf-8');
}
