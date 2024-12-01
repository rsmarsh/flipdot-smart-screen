const daysFull = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];
const daysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const monthsFull = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const monthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

function getDateSuffix(date: number) {
  switch (date) {
    case 1:
    case 21:
    case 31:
      return 'st';
    case 2:
    case 22:
      return 'nd';
    case 3:
    case 23:
      return 'rd';
    default:
      return 'th';
  }
}

function getLongDay(day: number) {
  return daysFull[day];
}

function getShortDay(day: number) {
  return daysShort[day];
}

// returns "Tuesday 7th October"
export function getFullDate() {
  const today = new Date();
  const day = today.getDay();
  const date = today.getDate();
  const month = today.getMonth();

  const fullDate = `${getLongDay(day)} ${date}${getDateSuffix(date)} ${
    monthsFull[month]
  }`;

  return fullDate;
}

// returns "Tue 7th Jan"
export function getShortDate() {
  const today = new Date();
  const day = today.getDay();
  const date = today.getDate();
  const month = today.getMonth();

  const shortDate = `${getShortDay(day)} ${date}${getDateSuffix(date)} ${
    monthsShort[month]
  }`;

  return shortDate;
}

// returns "07/12/25"
export function getNumericalDate() {
  const today = new Date();
  const day = today.getDay();
  const date = today.getDate();
  // plus one because we're displaying the number and not the month name
  const month = today.getMonth() + 1;
  // last two numbers of the year
  const shortYear = String(today.getFullYear()).substring(2, 4);

  // ensure numbers less than ten are zero padded. 5 -> 05
  const paddedDate = date > 9 ? date : `0${date}`;
  const paddedMonth = month > 9 ? month : `0${month}`;

  const numericalDate = `${paddedDate}/${paddedMonth}/${shortYear}`;

  return numericalDate;
}
