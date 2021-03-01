/**
 * 
 * ref: https://stackoverflow.com/questions/12409299/how-to-get-current-formatted-date-dd-mm-yyyy-in-javascript-and-append-it-to-an-i
 * 
 *
 * This function will take date from its parameter and change date format into dd/mm/yyyy 
 * assign it to gen_date 
 *  
 */
const formatDate = (inputDate) => {
  /* Pass date with format yyyy-mm-dd to Date() returns a string representation of the date and time, assign it to gen_date  */
  let gen_Date = new Date(inputDate);
  /* Get the day of the week for the specified date from the input date using getDate() and assin it to generatedDay */
  const generatedDay = gen_Date.getDate();
  /* Get the month for the specified date from the input date using getMonth() and assin it to generatedMonth */
  const generatedYear = gen_Date.getFullYear();
  /* Get the year for the specified date from the input date using getFullYear() and assin it to generatedYear. */
  const generatedMonth = gen_Date.getMonth() + 1;
  /* Format the date as dd/mm/yyyy and return its value */
  const formatedDate = (`${generatedDay}/${generatedMonth}/${generatedYear}`);
  return formatedDate;
}

/** 
 * This function will take passing parameter date
 * and return the day name  
 */
const getDay = (inputDate) => {
  /* Pass date to Date() returns a string representation of the date and time, assign it to day  */
  let day = new Date(inputDate);
  /* Create an array with the days name*/
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  /** Get the day of the week for the specified date using getDate that will return number value 0~7
   * acoording to the returned value get day name with elemnt array
   *   Sunday=0 ,Monday=1,Tuesday=2,Wednesday=3,Thursday=4,=5 Friday=6, Saturday=7 
   */
  let dayFormated =
    days[day.getDay()];
  return dayFormated;
}

export {
  getDay,
  formatDate
}