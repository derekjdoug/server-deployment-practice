const supertest = require('supertest');
const server = require('../src/server.js');
const request = supertest(server.app);
const { db } = require('../src/db');

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
  it('500 error', async () => {
    const response = await request.get('/throw-error');
    expect(response.status).toBe(500);
  });
  it('404 error', async () => {
    let response = await request.get('/missing-file');
    expect(response.status).toBe(404);
  });

  describe('Golfers', () => {
    beforeEach(async () => {
      await db.sync();
    });

    it('creates a golfer', async () => {
      let response = await request.post('/golfer').send({
        golferName: 'Tiger Woods',
        golferCountry: 'USA',
        worldRanking: 1,
      });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        golferName: 'Tiger Woods',
        golferCountry: 'USA',
        worldRanking: 1,
      });
    });

    it('retrieves a golfer', async () => {
      let createResponse = await request.post('/golfer').send({
        golferName: 'Tiger Woods',
        golferCountry: 'USA',
        worldRanking: 1,
      });

      expect(createResponse.status).toBe(200);
      const createdId = createResponse.body.id;

      let retrieveResponse = await request.get(`/golfer/${createdId}`);

      expect(retrieveResponse.status).toBe(200);
      expect(retrieveResponse.body).toMatchObject({
        id: createdId,
        golferName: 'Tiger Woods',
        golferCountry: 'USA',
        worldRanking: 1,
      });
    });
  });
  describe('Musicians', () => {
    beforeEach(async () => {
      await db.sync();
    });

    it('creates a musician', async () => {
      let response = await request.post('/musician').send({
        musicianType: 'Pop',
        instrument: 'Synth',
      });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        musicianType: 'Pop',
        instrument: 'Synth',
      });
    });

    it('retrieves a musician', async () => {
      let createResponse = await request.post('/musician').send({
        musicianType: 'Pop',
        instrument: 'Synth',
      });

      expect(createResponse.status).toBe(200);
      const createdId = createResponse.body.id;

      let retrieveResponse = await request.get(`/musician/${createdId}`);

      expect(retrieveResponse.status).toBe(200);
      expect(retrieveResponse.body).toMatchObject({
        id: createdId,
        musicianType: 'Pop',
        instrument: 'Synth',
      });
    });
  });
});
