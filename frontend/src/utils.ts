export function numberToTime(num: number) {
  const hours = num >= 13 ? Math.trunc(num - 12) : Math.trunc(num);
  const minutes = (num % 1) * 60;

  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}${num < 12 ? 'am' : 'pm'}`;
}