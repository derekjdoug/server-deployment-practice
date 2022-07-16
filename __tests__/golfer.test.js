const Golfer = require('../src/handlers/golfer');
const supertest = require('supertest');
const server = require('../src/server');
const request = supertest(server.app);

describe('Golfer', () => {
  it('Gets Golfers', async () => {
    const response = await request.get('/golfer');
    expect(response.status).toBe(200);
  });
});
