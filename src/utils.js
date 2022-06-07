const convertMillisToMins = (millis) => Math.floor(millis / 1000 / 60);

const formatTimeSlot = (start, end) => {
  const padHours = (date) => String(new Date(date).getHours()).padStart(2, '0');
  const padMins = (date) => String(new Date(date).getMinutes()).padStart(2, '0');
  const startHours = padHours(start);
  const startMins = padMins(start);
  const endHours = padHours(end);
  const endMins = padMins(end);
  return `${startHours}:${startMins}-${endHours}:${endMins}`;
};

const getCurrentTimeInMillis = () => new Date().getTime();

const getDateStartInMillis = (date) => new Date(date).setHours(0, 0, 0, 0);

const getTimeInMillis = (date) => new Date(date).getTime();

const formatStr = (str) => str.toLowerCase().replace(/\s+/g, '');

export {
  convertMillisToMins,
  formatStr,
  formatTimeSlot,
  getCurrentTimeInMillis,
  getDateStartInMillis,
  getTimeInMillis,
};
