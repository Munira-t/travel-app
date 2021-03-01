/* ----- Test Server side ---- */
/* ref: https://www.freecodecamp.org/news/end-point-testing/ */
import 'babel-polyfill'

/*  Link to server file. */
const app = require('../server/server')
/* Require app and supertest. */
const supertest = require('supertest')
const request = supertest(app)

describe('Test sending requests to end point /tset', () => {
  /* test:1 */
  test('Sending get request to the end point /tset, it should return correct HTTP status, path, and body', async () => {
    const response = await request.get('/test')
    /* Test end point HTTP status */
    expect(response.status).toBe(200)
    /* Test end point path */
    expect(response.req.path).toBe('/test')
    /* Test end pint body */
    expect(response.body.test_message).toBe('Successful!!');
  })
  /* test:2 */
  test("Sending get request to false end point", async () => {
    const res = await request.get('/teest');
    expect(res.status).toBe(404);
  })
});