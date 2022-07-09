'use strict';

const supertest = require('supertest');
const server = require('../server.js');

const request = supertest(server.app);

describe("Node Server", () => {
  it('Hello World', async () => {
    const reponse = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, World");
  });
  it('Returns Data', async () => {
    const response = await request.get('/data');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: 'Dougie',
      role: 'Student',
    });
  });
});
