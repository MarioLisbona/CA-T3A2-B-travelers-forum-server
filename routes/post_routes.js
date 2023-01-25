import express from 'express'
import { PostModel } from '../models/post.js'
import { CommentModel } from '../models/comment.js'
import { param, body, validationResult } from 'express-validator'
import { validateToken } from './auth_routes.js'

const postRoutes = express.Router()

const categories = ['Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Australia']

// Get all posts
postRoutes.get('/', async (req, res) => res.send(await PostModel.find()
    .populate({ path: 'author', select: 'username' })
    .populate({ path: 'comments', populate: {
        path: 'author', select: 'username'
    }})
))

// Get all posts sorted newest first
postRoutes.get('/latest', async (req, res) => {
    try {
        const post = await PostModel.find().sort({ date_posted: 'desc' }).populate({path: 'author', select: 'username'})
            if (post) {
                res.send(post)
            } 
            else {
                res.status(404).send({ error: 'No posts found' })
            }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// Get single post by id and its comments
postRoutes.get('/:id', param('id').isLength(24), async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ error: 'Id must be 24 characters long'})
    }
    try {
        const post = await PostModel.findById(req.params.id).populate({ path: 'author', select: 'username' }).populate({ path: 'comments' })
        if (post) {
            res.send(post)
        } 
        else {
            res.status(404).send({ error: `Post not found with id: ${req.params.id}` })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// Get all posts by category
postRoutes.get('/category/:category', param('category').isIn(categories), async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ error: 'Not a valid category'})
    }
    try {
        const post = await PostModel.find({ category: req.params.category }).sort({ date_posted: 'desc' }).populate({ path: 'author', select: 'username' })
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
// JWT
postRoutes.post('/new', validateToken, async (req, res) => {
    try {
        const { title, category, content  } = req.body
        const insertPost = await PostModel.create({ 
            title, 
            author: req.id, 
            category, 
            content
        })
        res.status(201).send(await insertPost.populate({ path: 'author', select: 'username' }))
        }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// Update post
// JWT
postRoutes.put('/:id', async (req, res) => {
    const { title, category, content  } = req.body
    const updatedPost = { title, category, content }
    try {
        const post = await PostModel.findByIdAndUpdate(req.params.id, updatedPost, { returnDocument: 'after' })
        if (post) {
            res.send(post)
        } else {
            res.status(404).send({ error: 'Post not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

// Delete post
// JWT
postRoutes.delete('/:id', async (req, res) => {
    try {
        const post = await PostModel.findByIdAndDelete(req.params.id)
        if (post) {
            res.sendStatus(204)
        } else {
            res.status(404).send({ error: 'Post not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

export default postRoutes
