import express from 'express'
import { PostModel } from '../models/post.js'

const postRoutes = express.Router()

// Get all posts
postRoutes.get('/', async (req, res) => res.send(await PostModel.find().populate({path: 'author', select: 'username'})))

// Get single post by id
postRoutes.get('/:id', async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id).populate({ path: 'author', select: 'username' })
            if (post) {
                res.send(post)
            } 
            else {
                res.status(404).send({ error: 'Post not found' })
            }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// Get all posts by category
postRoutes.get('/category/:category', async (req, res) => {
    try {
        const post = await PostModel.find({ category: req.params.category }).populate({ path: 'author', select: 'username' })
            if (post) {
                res.send(post)
            } 
            else {
                res.status(404).send({ error: 'No posts found in that category' })
            }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// Post new post
postRoutes.post('/new', async (req, res) => {
    try {
        // 1. Create a new entry object with values passed in from the request
        const { title, author, category, content  } = req.body
        const newPost = { title, author, category, content }
        // 2. Push the new entry to the entries array
        // entries.push(newEntry)
        const insertPost = await PostModel.create(newPost)
        // 3. Send the new entry with 201 status
        res.status(201).send(await insertPost.populate({ path: 'author', select: 'username' }))
        }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})



export default postRoutes
