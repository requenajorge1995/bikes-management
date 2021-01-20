export interface Schedule {
  [time: string]: {
    bikesAvailable: number;
    bookedByUser: boolean;
  };
}