import { START_TIME, END_TIME, BLOCK_SIZE } from './config';


interface Datebase {
  [hour: string]: string[];
}

function initDatebase() {
  const db = {} as Datebase;

  for (let i = START_TIME; i < END_TIME; i += BLOCK_SIZE)
    db[i] = [];

  return db;
}

export default initDatebase();