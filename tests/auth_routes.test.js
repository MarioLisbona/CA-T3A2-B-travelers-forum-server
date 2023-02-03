import app from '../app.js'
import request from 'supertest'
import { dbConnect, dbClose } from '../db.js'
import dotenv from 'dotenv'

dotenv.config()

// establish a connection to the database 
const DATABASE_URI = process.env.MONGO_URI_TEST || `mongodb://localhost:27017/${process.env.npm_package_name}-${process.env.NODE_ENV.toLowerCase()}`;

beforeEach(async () => {
    await dbConnect(DATABASE_URI)
})

afterEach(async () => {
    await dbClose()
})


describe("Register new Member", () => {

    const testUsername = 'NewMember123'
    const testPassword = 'NewMember123!'
    // This test can only run once, then the testUsername must be changed or DB reseeded
    test('Successfuly log in a member', async () => {
        const resRegister = await request(app).post('/auth/register')
        .send({
            username: testUsername,
            password: testPassword
        })
        const res = await request(app).post('/auth/login')
        .send({
            username: testUsername,
            password: testPassword
        })
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        expect(res.body.id).toBeDefined()
        expect(res.body.token).toBeDefined()
        expect(res.body.username).toBe(testUsername)
        
    })

    test('Login member fails when logging in with an incorrect password', async () => {
        const res = await request(app).post('/auth/login')
        .send({
            username: testUsername,
            password: 'gsgdgsdg'
        })
        expect(res.status).toBe(401)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        expect(res.body.error).toBe('Incorrect username or password')
    })


    test('Login member fails when logging in with an incorrect username', async () => {
        const res = await request(app).post('/auth/login')
        .send({
            username: 'NotAMember',
            password: testPassword
        })
        expect(res.status).toBe(401)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        expect(res.body.error).toBe('Incorrect username or password')
    })

    test('Login member fails when logging in with no username', async () => {
        const res = await request(app).post('/auth/login')
        .send({
            password: testPassword
        })
        expect(res.status).toBe(400)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        expect(res.body.errors[0].msg).toBe('Username Required')
        expect(res.body.errors[0].param).toBe('username')
    })

    test('Login member fails when logging in with no username with no password', async () => {
        const res = await request(app).post('/auth/login')
        .send({
            username: testUsername,
        })
        expect(res.status).toBe(400)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        expect(res.body.errors[0].msg).toBe('Password Required')
        expect(res.body.errors[0].param).toBe('password')
    })
})

