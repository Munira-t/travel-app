/* Require dotenv to separate secrets from the source code. */
const dotenv = require('dotenv')
dotenv.config()

/* Require path to provide useful functionality to access and interact with the file system */
const path = require('path')

/* Require express to run server and routes, body-parser, and cors. */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

/* Enable the use of fetch functions inside Nodejs. */
const fetch = require('node-fetch')

/* Start-up an instance of app. */
const app = express()

/* Handel cors for cross origin allowanc. */
app.use(cors())

/* Handle body parsing configuring express to use body-parser as middle-ware. */
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(bodyParser.json())

/* Initialize the main project folder. */
app.use(express.static('dist'))

/* Transfers files at the given path when GET request is made to the homepage */
app.get('/', (req, res) => {
  /* Prod mode path. */
  res.sendFile('dist/index.html')
  /* Dev mode path. */
  // res.sendFile(path.resolve('src/client/views/index.html'))
})

/* Setup server to run on port: 8086 */
const port = process.env.PORT || 8086
app.listen(port, (err) => {
  if (err) throw new Error(err)
  console.log(`Server is running on port http://localhost:${port} !!`)
})


/** Declare varibles for API's Base URL
 * 
 * Geonames base URL
 * Pixabay base URL
 * Weatherbit base URL
 * 
 */
const geonamesBaseURL = 'http://api.geonames.org'
const restcountriesBaseURL = 'https://restcountries.eu/rest/v2/alpha'
const weatherbitBaseURL = 'https://api.weatherbit.io/v2.0/current?'
const pixabayBaseURL = 'http://pixabay.com/api'

/** Declare Varibles for API's key 
 *
 *  Geoname, Pixabay, Weatherbit.
 * 
 */
const geoKey = process.env.GEO_API_KEY
const weatherKey = process.env.WEATHER_MASTER_API_KEY
const pixaKey = process.env.PIX_API_KEY


/* Setup route '/destination' to recive POST requiest. */
app.post('/destination', async (req, res) => {
  /* Get destination city from the client side. */
  const {
    destinationCity
  } = await req.body;

  /* Fetch data from GeonameAPI and assign recived data to the response constant.*/
  const response = await fetch(`${geonamesBaseURL}/searchJSON?formatted=true&q=${destinationCity}&username=${geoKey}`)
  try {
    /* Convert the recived data into json and assign it to the geonamesData constant. */
    const geonamesData = await response.json()

    /* Send the object 'recived_geonamesData' that contain the spacify data to the client side */
    res.send(
      (recived_geonamesData = {
        lang: geonamesData.geonames[0].lng,
        lat: geonamesData.geonames[0].lat,
        destCityName: geonamesData.geonames[0].toponymName,
        countryName: geonamesData.geonames[0].countryName,
        countryCode: geonamesData.geonames[1].countryCode
      })
    ) /* Handle error if occur */
  } catch (error) {
    console.error(error.message)
  }
})


/* Setup route '/countryflag' to recive POST requiest. */
// app.post('/countryflag', async (req, res) => {
//   /* Get country Code from the client side. */
//   const countryCode = req.body.countryCode

//   /*Fetch data from restcountries and assign recived data to the response constant. */
//   const response = await fetch(`${restcountriesBaseURL}/${countryCode}`)
//   try {
//     /* Convert the recived data into json and assign it to the restcountriesData constant. */
//     const restcountriesData = await response.json()

//     /* Send the object 'recived_geonamesData' that contain the spacify data to the client side */
//     res.send(
//       (recived_restcountriesData = {
//         countryFlag: restcountriesData.flag
//       })
//     ) /* Handle error if occur */
//   } catch (error) {
//     console.error(error.message)
//   }
// })


/* Setup route '/weather' to recive POST requiest. */
app.post('/weather', async (req, res) => {
  /* Get lang and lat from the client side. */
  const longitude = req.body.lang
  const latitude = req.body.lat

  /* Fetch data from Weatherbit  and assign recived data to the response constant. */
  const response = await fetch(`${weatherbitBaseURL}lat=${latitude}&lon=${longitude}&key=${weatherKey}`)
  try {
    /* Convert the recived data into json and assign it to the geonamesData constant. */
    const weatherData = await response.json()
    const iconCode = weatherData.data[0].weather.icon;
    const weatherIcon = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`


    /* Send the object 'recived_geonamesData' that contain the spacify data to the client side */
    res.send(
      (recived_weatherData = {
        weatherDescription: weatherData.data[0].weather.description,
        weatherTemp: weatherData.data[0].temp,
        weatherIcon: weatherIcon
      })
    ) /* Handle error if occur */
  } catch (error) {
    console.error(error.message)
  }
})


/* Setup route '/image' to recive POST requiest. */
app.post('/image', async (req, res) => {
  /* Get countryName from the client side. */
  const destCityName = await req.body.destCityName;

  /* Fetch data from pixabayBaseURL and assign recived data to the response constant. */
  const response = await fetch(`${pixabayBaseURL}/?key=${pixaKey}&q=${destCityName}&image_type=photo&orientation=horizontal&per_page=3&pretty=true`)
  try {
    /* Convert the recived data into json and assign it to the pixabasData constant. */
    const pixabayData = await response.json()

    /* Send the object 'recived_pixabasData' that contain the spacify data to the client side */
    res.send(recived_pixabaData = {
      image: pixabayData.hits[1].largeImageURL
    }) /* Handle error if occur */
  } catch (error) {
    console.error(error.message)
  }
})

/* Setup route '/test' to recive GET requiest. */
app.get('/test', async (req, res) => {
  res.json({
    test_message: 'Successful!!'
  })
})


module.exports = app