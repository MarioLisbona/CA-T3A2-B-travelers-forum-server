import app from '../app.js'
import request from 'supertest'

describe("Database connection", () => {

    test('Get homepage', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body.test_response).toBeDefined()
        expect(res.body.test_response).toBe('Test GET Request successful')
    })
})

describe("/posts functionality", () => {

    test('Get all posts', async () => {
        const res = await request(app).get('/posts')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/i)
        // expect(res.body).toBeDefined()
        // expect(res.body.test_response).toBe('Test GET Request successful')
    })

    test('Get one post', async () => {
        const res = await request(app).get('/posts/:id')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/i)
        // expect(res.body).toBeDefined()
        // expect(res.body.test_response).toBe('Test GET Request successful')
    })

})
