const currentDate = new Date();
const currentDateFormat = `Current Date and Time: ${currentDate}`;
console.log(currentDateFormat);
function formatDateMMDDYYYY(dateObject) {
  const localeString = dateObject.toLocaleDateString(`en-US`, {
    year: `numeric`,
    month: `numeric`,
    day: `numeric`
  });
  return `Formatted Date (MM/DD/YYYY): ${localeString}`;
}

console.log(formatDateMMDDYYYY(currentDate));

function formatDateLong(dateObject) {
  const localeString = dateObject.toLocaleDateString(`en-US`, {
    year: `numeric`,
    month: `long`,
    day: `numeric`
  });
  return `Formatted Date (Month Day, Year): ${localeString}`;
}

console.log(formatDateLong(currentDate));
