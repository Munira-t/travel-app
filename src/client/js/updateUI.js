/* This function will accept tripInfo object that contains all trip data, then update UI. */
const updateUI = (tripInfo) => {
  /* Get the main element by its id assign it to main constant. */
  const main = document.getElementById('main')
  /* insert tripInfo data object within the HTML and into the document */
  main.innerHTML = `
  <section class="trip-section">
    <div class="trip-container">
      <div class="trip-header" id="trip-header">
        <div class="location-name">
          <h2 id="country-name">${tripInfo.countryName}</h2>
          <p id="city-name">${tripInfo.destCityName}</p>
        </div>
      </div>
      <div class="trip-main">
        <div class="trip-weather">
          <img src="${tripInfo.weatherIcon}" alt="weather icon" id="weather-icon">
          <p id="weather-temp">${tripInfo.weatherTemp}°</p>
          <p id="weather-description">${tripInfo.weatherDescription}</p>
        </div>
        <div class="trip-info">
          <h4 class="trip-title">Your trip will </h4>
          <div class="trip-date">
            <div class="start-date-section">
              <p>Begin in</p>
              <div id="departure-date">${tripInfo.departureDate}</div>
              <div id="departure-day">${tripInfo.departureDay}</div>
            </div>
            <div class="end-date-section">
              <p>End in</p>
              <div id="arrival-date">${tripInfo.arriveDate}</div>
              <div id="arrivel-day">${tripInfo.arriveDay}</div>
            </div>
          </div>
          <div class="trip-duration-section">
            <p>The trip lasts</p>
            <div id="trip-duration">${tripInfo.tripDuration} Days</div>
          </div>
        </div>
      </div>
    </div>
  </section>`
  /* Set tripInfo.image "location image" as a background-image for the element with id trip-header. */
  const tripHeader = document.getElementById('trip-header');
  tripHeader.style.backgroundImage = `url(${tripInfo.image})`
}

export default updateUI