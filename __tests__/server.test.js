const supertest = require('supertest');
const server = require('../src/server');

const request = supertest(server.app);
const handle500Error = require('../src/error-handlers/500');
const handle404Error = require('../src/error-handlers/404');

describe('Node Server', () => {
  it('Hello World', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World');
  });
  it('Returns Data', async () => {
    const response = await request.get('/data');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: 'Dougie',
      role: 'Student',
    });
  });
  it('500 error', () => {
    return server
      .use(handle500Error.handle500Error);
  });
});
