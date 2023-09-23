export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function sortByDate(dates) {
  const sortedByDate = dates.sort(({date: a}, {date: b}) => a < b ? 1 : a > b ? -1 : 0);
  return sortedByDate;
}
