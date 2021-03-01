/* import js files */
import getTripDuration from './js/TripDuration'
import handleSubmit from './js/submitHandler.js'
import {
  formatDate,
  getDay
} from './js/dateHandler.js'

/* import scss files */
import './styles/style.scss'

/* import image */
import '../../images/img1.jpg'


/* Fires when the initial HTML document has been completely loaded and parsed. */
window.addEventListener('DOMContentLoaded', () => {

  /* Get the form element by its id and asign it to a constant called form. */
  const form = document.getElementById('trip-input-form')

  /* Add event listener to 'form' when user click submit. */
  form.addEventListener('submit', (e) => {
    /* Prevent the default action. */
    e.preventDefault()

    /* Call handleSubmit() function. */
    handleSubmit()
  })
})

export {
  handleSubmit,
  getTripDuration,
  getDay,
  formatDate
}