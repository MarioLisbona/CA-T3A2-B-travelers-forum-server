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


describe("Create comment", () => {

    let resLogin
    let resPost

    beforeEach(async () => {
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


describe("Integrate login, create post and edit post with logged in user", () => {

    test('Workflow: Successfully login, create a new post and then edit it', async () => {

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