/**
 * 
 *  ref: https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
 * 
 *  */
const getTripDuration = (departure_date, arrive_date) => {
  /* Pass the two date to Date() that will returns a string representation of the date and time, assign it to both variable  */
  let tripStartDate = new Date(departure_date);
  let tripEndDate = new Date(arrive_date);

  /* Calling getTime to returns the number of milliseconds of both dates to calculate the time difference and assign the result to new variable */
  let timeDifference = tripEndDate.getTime() - tripStartDate.getTime();

  /* the time difference of both the dates by no. of milliseconds in a day */
  let divider = (1000 * 3600 * 24);

  /* return the calculated no. of days between two dates */
  return timeDifference / divider;
}

export default getTripDuration