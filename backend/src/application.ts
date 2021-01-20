import db from './database';

import { BIKES_BY_BLOCK } from './config';

interface Schedule {
  [time: string]: {
    bikesAvailable: number;
    bookedByUser: boolean;
  };
}

export function getSchedule(user: string): Schedule {
  return Object.entries(db)
    .reduce((accum, entry) => {

      const [time, users] = entry;

      accum[time] = {
        bikesAvailable: BIKES_BY_BLOCK - users.length,
        bookedByUser: users.includes(user)
      };
      return accum;
    }, {} as Schedule);
}


export function book(user: string, time: string): void {
  isValidTime(time);
  const users = db[time];

  switch (true) {
    case users.includes(user):
      throw new DomainError('Time already booked');
    case users.length >= BIKES_BY_BLOCK:
      throw new DomainError('There is no bikes available');
    default:
      users.push(user);
  }
}

export function cancel(user: string, time: string): void {
  isValidTime(time);

  if (!db[time].includes(user))
    throw new DomainError('Time not booked');

  db[time] = db[time].filter(userIterator => userIterator !== user);
}

function isValidTime(time: string) {
  if (!(time in db))
    throw new DomainError('Invalid time');
}

export class DomainError extends Error { }