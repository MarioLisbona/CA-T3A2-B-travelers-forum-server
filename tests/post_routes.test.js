import app from '../app.js'
import request from 'supertest'

describe("Get posts", () => {

    test('Get all posts', async () => {
        const res = await request(app).get('/posts')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        res.body.forEach(element => {
            expect(element).toHaveProperty('_id')
            expect(element).toHaveProperty('title')
            expect(element).toHaveProperty('author')
            expect(element).toHaveProperty('category')
            expect(element).toHaveProperty('content')
            expect(element).toHaveProperty('comments')
            expect(element).toHaveProperty('date_posted')
        })       
    })
})


describe("Get posts in Category", () => {

    test('Get all posts in a category', async () => {
        const res = await request(app).get('/posts/category/Australia')
        .send()
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        res.body.forEach(element => {
            expect(element.category).toBe('Australia')
            expect(element).toHaveProperty('_id')
            expect(element).toHaveProperty('title')
            expect(element).toHaveProperty('author')
            expect(element).toHaveProperty('category')
            expect(element).toHaveProperty('content')
            expect(element).toHaveProperty('comments')
            expect(element).toHaveProperty('date_posted')
        })       
    })

    test('Error when passing invalid category as param', async () => {
        const res = await request(app).get('/posts/category/ehrtdhf')
        .send()
        expect(res.status).toBe(400)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        expect(res.body.errors[0].value).toBe('ehrtdhf')
        expect(res.body.errors[0].msg).toBe('Invalid category')
        expect(res.body.errors[0].param).toBe('category')
    })
})


describe("Create post", () => {

    let resLogin

    beforeEach(async () => {
        resLogin = await request(app).post('/auth/login')
        .send({
            username: 'Callum1',
            password: 'Callum123!'
        })
        expect(resLogin.status).toBe(200)
        expect(resLogin.body.token).toBeDefined()
    })

    test('Successfully create post', async () => {
        const resPost = await request(app).post('/posts/new')
        .send({
            title: 'Create a post in North America',
            category: 'North America',
            content: 'Content about NA'
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)
        expect(resPost.status).toBe(201)
        expect(resPost.headers['content-type']).toMatch(/json/i)
        expect(resPost.body).toBeDefined()
        expect(resPost.body).toHaveProperty('_id')
        expect(resPost.body).toHaveProperty('comments')
        expect(resPost.body).toHaveProperty('date_posted')
        expect(resPost.body.title).toBe('Create a post in North America')
        expect(resPost.body.author.username).toBe('Callum1')
        expect(resPost.body.category).toBe('North America')
        expect(resPost.body.content).toBe('Content about NA')
 
    })

    test('Error when passing title > 50 characters in body', async () => {
        const resPost = await request(app).post('/posts/new')
        .send({
            title: 'Create post in North America. This is 51 characters',
            category: 'North America',
            content: 'Content about NA'
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)

        expect(resPost.status).toBe(400)
        expect(resPost.headers['content-type']).toMatch(/json/i)
        expect(resPost.body).toBeDefined()
        expect(resPost.body.errors[0].value).toBe('Create post in North America. This is 51 characters')
        expect(resPost.body.errors[0].msg).toBe('Max title length is 50 characters')
        expect(resPost.body.errors[0].param).toBe('title')
    })

    test('Error when passing invalid category in body', async () => {
        const resPost = await request(app).post('/posts/new')
        .send({
            title: 'Create a post in North America',
            category: 'USA',
            content: 'Content about NA'
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)

        expect(resPost.status).toBe(400)
        expect(resPost.headers['content-type']).toMatch(/json/i)
        expect(resPost.body).toBeDefined()
        expect(resPost.body.errors[0].value).toBe('USA')
        expect(resPost.body.errors[0].msg).toBe('Invalid category')
        expect(resPost.body.errors[0].param).toBe('category')
    })

    test('Error when passing no content in body', async () => {
        const resPost = await request(app).post('/posts/new')
        .send({
            title: 'Create a post in North America',
            category: 'North America',
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)

        expect(resPost.status).toBe(400)
        expect(resPost.headers['content-type']).toMatch(/json/i)
        expect(resPost.body).toBeDefined()
        expect(resPost.body.errors[0].msg).toBe('Content is required')
        expect(resPost.body.errors[0].param).toBe('content')
    })
})