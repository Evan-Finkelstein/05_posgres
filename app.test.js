require('dotenv').config();

// const { execSync } = require('child_process');
// const { stringify } = require('querystring');

const fakeRequest = require('supertest');
const app = require('./index');
const pool = require('./lib/utils/pool');
// const client = require('../lib/client');

afterAll(async () => {
  await pool.end();
});
test('returns all dogs', async () => {

  const expectation = [
    {
      "id": expect.any(String),
      "name": "bill",
      "breed": "chicken",
      "description": "brown"
    }];



  const data = await fakeRequest(app)
    .get('/dogs')
    .expect('Content-Type', /json/)
    .expect(200);

  expect(data.body).toEqual(expectation);
});







test('update a dog', async () => {

  const expectation =
  {
    "id": expect.any(String),
    "name": "bill",
    "breed": "chicken",
    "description": "brown"
  }

    ;

  const data = await fakeRequest(app)
    .put('/dogs/33')
    .send({

      "name": "bill",
      "breed": "chicken",
      "description": "brown"
    })
    .expect('Content-Type', /json/)
    .expect(200);

  expect(data.body).toEqual(expectation);
});
test('get a dog', async () => {

  const expectation =
  {
    "id": expect.any(String),
    "name": "bill",
    "breed": "chicken",
    "description": "brown"
  }

    ;

  const data = await fakeRequest(app)
    .get('/dogs/33')

    .expect('Content-Type', /json/)
    .expect(200);

  expect(data.body).toEqual(expectation);
});




test('post a dog', async () => {

  const expected =
  {
    "id": expect.any(String),
    "name": "bill",
    "breed": "chicken",
    "description": "brown"
  }
  const data = await fakeRequest(app)
    .post('/dogs')
    .send({

      "name": "bill",
      "breed": "chicken",
      "description": "brown"
    })

    .expect('Content-Type', /json/)
    .expect(200);



  expect(data.body).toEqual(expected);

});

test('delete dog', async () => {

  const expectation =
  {
    "id": expect.any(String),
    "name": "bill",
    "breed": "chicken",
    "description": "brown"
  };



  const data = await fakeRequest(app)
    .delete(`/dogs/33`)
    .expect('Content-Type', /json/)
    .expect(200);

  expect(data.body).toEqual(expectation);
});