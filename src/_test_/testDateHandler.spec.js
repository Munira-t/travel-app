/* ----- Test Client Side ----- */
/* Configuring Babel */
import 'babel-polyfill'
/* Import the js file to test. */
import {
  getDay,
  formatDate
} from '../client/js/dateHandler.js'

/* ref:https://thomlom.dev/how-to-test-javascript-with-jest/ */

describe('Testing the getDay() functionality', () => {
  /* test:1 */
  /* Test if getDay() is a function. */
  test('Testing if getDay is a function', () => {
    expect(typeof getDay).toBe("function");
  })
  /* test:2 */
  /* Test the functionality of getDay() */
  test('Testing the return value of getDay to be Monday', () => {
    expect(getDay("2021-03-01")).toEqual("Monday");
  })
});


describe('Testing the formatDate functionality', () => {
  /* test:3 */
  /* Test if formatDate() is a function. */
  test('Testing if formatDate is a function', () => {
    expect(typeof formatDate).toBe('function')
  })
  /* test:4 */
  /*Test the functionality of formatDate() */
  test('testing the return value of formatDate() is dd/mm/yyyy', () => {
    expect(formatDate('2021-03-01')).toEqual('1/3/2021')
  })
});