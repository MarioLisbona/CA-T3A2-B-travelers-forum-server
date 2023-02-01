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


describe("Register new Member", () => {

    const testUsername = 'NewTestMember'

    // This test can only run once, then the testUsername must be changed or DB reseeded
    test('Successfuly register a new member. !!! Change tesUsername or reseed DB to test again !!! ', async () => {
        const res = await request(app).post('/auth/register')
        .send({
            username: testUsername,
            password: 'Member123!'
        })
        expect(res.status).toBe(201)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        expect(res.body.id).toBeDefined()
        expect(res.body.username).toBe('NewTestMember')
    })

    test('Register member fails when registering a username that already exists', async () => {
        const res = await request(app).post('/auth/register')
        .send({
            username: testUsername,
            password: 'Member123!'
        })
        expect(res.status).toBe(409)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        expect(res.body.error).toBe('Username taken')
    })


    test('Register member fails when registering an invalid password', async () => {
        const res = await request(app).post('/auth/register')
        .send({
            username: 'NewTestMember99',
            password: 'Nonumbernosymbol'
        })
        expect(res.status).toBe(400)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        expect(res.body.errors[0].value).toBe('Nonumbernosymbol')
        expect(res.body.errors[0].msg).toBe('Password must be atleast 8 characters; 1 uppercase, 1 lowercase, 1 number and 1 symbol')
        expect(res.body.errors[0].param).toBe('password')
    })

    test('Register member fails when no username given', async () => {
        const res = await request(app).post('/auth/register')
        .send({
            password: 'Nonumbernosymbol'
        })
        expect(res.status).toBe(400)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        expect(res.body.errors[0].msg).toBe('Username Required')
        expect(res.body.errors[0].param).toBe('username')
    })

    test('Register member fails when no password given', async () => {
        const res = await request(app).post('/auth/register')
        .send({
            username: 'NewTestMember55'
        })
        expect(res.status).toBe(400)
        expect(res.headers['content-type']).toMatch(/json/i)
        expect(res.body).toBeDefined()
        expect(res.body.errors[0].msg).toBe('Password Required')
        expect(res.body.errors[0].param).toBe('password')
    })
})


describe("Integrate login, create post and create comment with logged in user", () => {

    test('Workflow: Login, create a new post and then comment on it', async () => {

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

        // Create comment using post id from post just created and JWT from user login
        const resComment = await request(app).post('/comments/new')
        .send({
            post: resPost.body._id,
            content: 'Commenting on the post just made as the same user'
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
        expect(resComment.body.content).toBe('Commenting on the post just made as the same user')
    })
})


describe("Integrate login, create comment, edit comment and then delete comment with logged in user", () => {

    test('Workflow: Login, create a new post and then comment on it', async () => {

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

        // Create comment using post id from post just created and JWT from user login
        const resComment = await request(app).post('/comments/new')
        .send({
            post: resPost.body._id,
            content: 'Commenting on the post just made as the same user'
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
        expect(resComment.body.content).toBe('Commenting on the post just made as the same user')
    })
})