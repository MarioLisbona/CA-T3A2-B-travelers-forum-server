import app from '../app.js'
import request from 'supertest'

describe("Create comment", () => {

    let resLogin
    let resPost
           

    beforeEach(async () => {
         // Ensure user exists by trying to register them
         await request(app).post('/auth/register')
         .send({
             username: 'Callum1',
             password: 'Callum123!'
         })
         
        resLogin = await request(app).post('/auth/login')
        .send({
            username: 'Callum1',
            password: 'Callum123!'
        })
        expect(resLogin.status).toBe(200)
        expect(resLogin.body.token).toBeDefined()

        resPost = await request(app).post('/posts/new')
        .send({
            title: 'Create a post to test comments on',
            category: 'Asia',
            content: 'Testing comments'
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)
        expect(resPost.status).toBe(201)
        expect(resPost.body).toBeDefined()
    })

    test('Successfully create comment', async () => {
        const resComment = await request(app).post('/comments/new')
        .send({
            post: resPost.body._id,
            content: 'Content about NA'
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)
        expect(resComment.status).toBe(201)
        expect(resComment.headers['content-type']).toMatch(/json/i)
        expect(resComment.body).toBeDefined()
        expect(resComment.body).toHaveProperty('_id')
        expect(resComment.body).toHaveProperty('post')
        expect(resComment.body).toHaveProperty('date_posted')
        expect(resComment.body.author.username).toBe('Callum1')
        expect(resComment.body.post).toBe(resPost.body._id)
        expect(resComment.body.content).toBe('Content about NA')
    })

    test('Error when not passing post id in body', async () => {
        const resComment = await request(app).post('/comments/new')
        .send({
            content: 'Content about NA'
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)
        expect(resComment.status).toBe(400)
        expect(resComment.headers['content-type']).toMatch(/json/i)
        expect(resComment.body).toBeDefined()
        expect(resComment.body.errors[0].msg).toBe('Post id required')
        expect(resComment.body.errors[0].param).toBe('post')
    })

    test('Error when passing post id that is not a mongo id', async () => {
        const resComment = await request(app).post('/comments/new')
        .send({
            post: 'Not a mongo id',
            content: 'Content about NA'
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)
        expect(resComment.status).toBe(400)
        expect(resComment.headers['content-type']).toMatch(/json/i)
        expect(resComment.body).toBeDefined()
        expect(resComment.body.errors[0].value).toBe('Not a mongo id')
        expect(resComment.body.errors[0].msg).toBe('Invalid Mongo id')
        expect(resComment.body.errors[0].param).toBe('post')
    })

    test('Error when passing no content in body', async () => {
        const resComment = await request(app).post('/comments/new')
        .send({
            post: resPost.body._id
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)
        expect(resComment.status).toBe(400)
        expect(resComment.headers['content-type']).toMatch(/json/i)
        expect(resComment.body).toBeDefined()
        expect(resComment.body.errors[0].msg).toBe('Content is required')
        expect(resComment.body.errors[0].param).toBe('content')
        expect(resComment.body.errors[1].msg).toBe('Max comment length is 1000 characters, Min 1 character')
        expect(resComment.body.errors[0].param).toBe('content')
    })
})