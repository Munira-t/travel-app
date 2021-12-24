/* import js files */
import getTripDuration from './TripDuration'
import updateUI from './updateUI'
import {
  formatDate,
  getDay
} from './dateHandler'

/* Declare trip object*/
let tripInfo = {};

async function handleSubmit() {

  /* Get user input from DOM elements */
  const destinationCity = document.getElementById('destination-city').value
  const departureDate = document.getElementById('departure-date').value;
  const arriveDate = document.getElementById('arrive-date').value;
  console.log(destinationCity)
  console.log(departureDate)

  /* Format date to dd/mm/yyyy */
  tripInfo.departureDate = formatDate(departureDate);
  tripInfo.arriveDate = formatDate(arriveDate);

  /* Get departure day and arrive day and insert it in tripInfo object*/
  tripInfo.departureDay = getDay(departureDate);
  tripInfo.arriveDay = getDay(arriveDate);


  /* Get trip duration via getTripDuration() function that pass two parameter */
  const tripDuration = getTripDuration(departureDate, arriveDate);
  /* Add tripDuration to tripInfo object */
  tripInfo.tripDuration = tripDuration;


  /** 
   * 
   * Check if user input for the 'arrivel date' is before or the same date as the 'departure date' for the trip, if true return alert that ask user to enter vlaid dates. if false diplay to the user the trip info. 
   * 
   */
  if (destinationCity === "") {
    alert("Please Enter your destinatin.")
  } else if (arriveDate <= departureDate) {
    alert('The arrive date can not be befor departure date')
  } else {
    /* call postData() to get data from geoname api from the server by passing url and destinationCity */
    postData('http://localhost:8086/destination', {
      destinationCity
    }).then((geoData) => {
      /** 
       * Add lang, lat, destCityName, countryName, that come from the server to tripInfo object.
       */
      tripInfo.lang = geoData.lang;
      tripInfo.lat = geoData.lat;
      tripInfo.destCityName = geoData.destCityName;
      tripInfo.countryName = geoData.countryName;
      tripInfo.countryCode = geoData.countryCode;
      console.log(geoData)
      console.log(tripInfo)

      // postData('http://localhost:8086/countryflag', {
      //   countryCode: tripInfo.countryCode
      // }).then((restcountriesData) => {
      //   tripInfo.countryFlag = restcountriesData.countryFlag
      //   console.log(tripInfo);
      // })
      /* call postData() to get data from Weatherbit api from the server by passing url and lang and */
      postData('http://localhost:8086/weather', {
        lang: tripInfo.lang,
        lat: tripInfo.lat
      }).then((weatherData) => {
        tripInfo.weatherDescription = weatherData.weatherDescription
        tripInfo.weatherTemp = weatherData.weatherTemp
        tripInfo.weatherIcon = weatherData.weatherIcon
        console.log(tripInfo);
      })
      /* call postData() to get image from pixabay api from the server by passing destinationCity */
      postData('http://localhost:8086/image', {
        destCityName: tripInfo.destCityName
      }).then((data) => {
        tripInfo.image = data.image
        console.log(tripInfo)
        updateUI(tripInfo)
      })
    })
  }
}

/* Post data to the server  */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  try {
    return await response.json()
    /* Handle error if occur */
  } catch (error) {
    console.error(error.message)
  }
}

export default handleSubmit
export {
  tripInfo
}