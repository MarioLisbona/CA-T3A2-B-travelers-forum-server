import app from '../app.js'
import request from 'supertest'
import { dbClose } from '../db.js'
import mongoose from 'mongoose'

beforeEach(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI_TEST)
    }
    catch (error) {
        console.error(error)
    }
})

describe("Database connection", () => {

    test('Get homepage', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body.test_response).toBeDefined()
        expect(res.body.test_response).toBe('Test GET Request successful')
    })
})


describe("Integrate login, create post and edit post with logged in user", () => {

    test('Workflow: Successfully login, create a new post and then edit it', async () => {

        // Ensure user exists by trying to register them
        await request(app).post('/auth/register')
        .send({
            username: 'Callum1',
            password: 'Callum123!'
        })

        // Login with username and password
        const resLogin = await request(app).post('/auth/login')
        .send({
            username: 'Callum1',
            password: 'Callum123!'
        })

        expect(resLogin.status).toBe(200)
        expect(resLogin.headers['content-type']).toMatch(/json/i)
        expect(resLogin.body).toBeDefined()
        expect(resLogin.body).toHaveProperty('id')
        expect(resLogin.body).toHaveProperty('token')
        expect(resLogin.body.username).toBe('Callum1')

        // Create post using JWT created in login
        const resPost = await request(app).post('/posts/new')
        .send({
            title: 'Testing post creation',
            category: 'Africa',
            content: 'Content about testing creation of a new post'
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)

        expect(resPost.status).toBe(201)
        expect(resPost.headers['content-type']).toMatch(/json/i)
        expect(resPost.body).toBeDefined()
        expect(resPost.body).toHaveProperty('_id')
        expect(resPost.body).toHaveProperty('comments')
        expect(resPost.body).toHaveProperty('date_posted')
        expect(resPost.body.title).toBe('Testing post creation')
        expect(resPost.body.author.username).toBe('Callum1')
        expect(resPost.body.category).toBe('Africa')
        expect(resPost.body.content).toBe('Content about testing creation of a new post')

        // Edit post using post id from post just created and JWT from user login
        const resEditPost = await request(app).put(`/posts/${resPost.body._id}`)
        .send({
            title: 'Testing post creation --- edit',
            category: 'South America',
            content: 'Content about testing creation of a new post --- Editing the post just made'
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)

        expect(resEditPost.status).toBe(200)
        expect(resEditPost.headers['content-type']).toMatch(/json/i)
        expect(resEditPost.body).toBeDefined()
        expect(resEditPost.body).toHaveProperty('_id')
        expect(resEditPost.body).toHaveProperty('comments')
        expect(resEditPost.body).toHaveProperty('date_posted')
        expect(resEditPost.body.title).toBe('Testing post creation --- edit')
        expect(resEditPost.body.author.username).toBe('Callum1')
        expect(resEditPost.body.category).toBe('South America')
        expect(resEditPost.body.content).toBe('Content about testing creation of a new post --- Editing the post just made')
    })
})



describe("Integrate login, create comment, edit comment and then delete comment with logged in user", () => {

    test('Workflow: Successfully login, create a new post and then comment on it, edit and delete comment', async () => {

        // Ensure user exists by trying to register them
        await request(app).post('/auth/register')
        .send({
            username: 'Callum1',
            password: 'Callum123!'
        })

        // Login with username and password
        const resLogin = await request(app).post('/auth/login')
        .send({
            username: 'Callum1',
            password: 'Callum123!'
        })

        expect(resLogin.status).toBe(200)
        expect(resLogin.headers['content-type']).toMatch(/json/i)
        expect(resLogin.body).toBeDefined()
        expect(resLogin.body).toHaveProperty('id')
        expect(resLogin.body).toHaveProperty('token')
        expect(resLogin.body.username).toBe('Callum1')

        // Create post for testing comments on
        const resPost = await request(app).post('/posts/new')
        .send({
            title: 'Testing comment creation',
            category: 'Australia',
            content: 'Content about creating editing and deleting comments'
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)


        // Create comment using post id from previous test post and JWT from user login
        const resComment = await request(app).post('/comments/new')
        .send({
            post: resPost.body._id,
            content: 'Comment to edit and delete'
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
        expect(resComment.body.content).toBe('Comment to edit and delete')
        
        // Create comment using post id from previous post and JWT from user login
        const resEditComment = await request(app).put(`/comments/${resComment.body._id}`)
        .send({
            content: 'Comment to edit and delete --- Now with an edit at the end'
        })
        .set('authorization', 'Bearer ' + resLogin.body.token)

        expect(resEditComment.status).toBe(200)
        expect(resEditComment.headers['content-type']).toMatch(/json/i)
        expect(resEditComment.body).toBeDefined()
        expect(resEditComment.body).toHaveProperty('_id')
        expect(resEditComment.body).toHaveProperty('post')
        expect(resEditComment.body).toHaveProperty('date_posted')
        expect(resEditComment.body.author.username).toBe('Callum1')
        expect(resEditComment.body.post).toBe(resPost.body._id)
        expect(resEditComment.body.content).toBe('Comment to edit and delete --- Now with an edit at the end')

        // Create comment using post id from previous post and JWT from user login
        const resDeleteComment = await request(app).delete(`/comments/${resComment.body._id}`)
        .send()
        .set('authorization', 'Bearer ' + resLogin.body.token)

        expect(resDeleteComment.status).toBe(204)
    })
})