import express from 'express'
import { PostModel } from '../models/post.js'
import { CommentModel } from '../models/comment.js'
import { param, body, validationResult } from 'express-validator'
import { validateToken } from './auth_routes.js'
import { validatePost, validateRequestSchema } from '../middleware/auth.js'
import { getAllPosts, getPost, getCategory, createPost } from '../controllers/post_controller.js'

const postRoutes = express.Router()

// Get all posts
postRoutes.get('/', getAllPosts)

// Get single post by id and its comments
postRoutes.get('/:id', getPost)

// Get all posts by category
postRoutes.get('/category/:category', getCategory)

// Post new post
// JWT
postRoutes.post('/new', validatePost, validateRequestSchema, createPost)

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
