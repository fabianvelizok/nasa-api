const request = require('supertest');
const app = require('../../app')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('launches API', () => {
  beforeAll(async () => {
    await mongoConnect()
  })

  afterAll(async () => {
    await mongoDisconnect()
  })

  describe('Test GET /v1/launches', () => {
    it('Should respond with a 200 status code', async () => {
      await request(app)
        .get('/v1/launches')
        .expect('Content-Type', /json/)
        .expect(200)
    })
  })

  describe('Test POST /v1/launches', () => {
    const body = {
      mission: "ZTM",
      rocket: "ZTM Rocket",
      target: "Kepler-296 f",
      launchDate: "January 3, 2033"
    }

    it('Should respond with a 201 status code', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(body)
        .expect('Content-Type', /json/)
        .expect(201)

      expect(response.body).toMatchObject({
        ...body,
        launchDate: new Date('January 3, 2033').toJSON()
      })
    })

    it('Should catch missing required props', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send({
          mission: "ZTM",
        })
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body).toStrictEqual({
        error: 'Missing required properties!'
      })
    })

    it('Should catch an invalid date', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send({
          ...body,
          launchDate: "Hello"
        })
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body).toStrictEqual({
        error: 'Invalid launch date property!'
      })
    })
  })
})