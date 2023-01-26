import express from 'express'
import { validatePost, validateRequestSchema } from '../middleware/auth.js'
import { getAllPosts, getPost, getCategory, createPost, updatePost, deletePost } from '../controllers/post_controller.js'

const postRoutes = express.Router()

// Get all posts
postRoutes.get('/', getAllPosts)

// Get single post by id
postRoutes.get('/:id', getPost)

// Get all posts in a category
postRoutes.get('/category/:category', getCategory)

// Post new post
// JWT
postRoutes.post('/new', validatePost, validateRequestSchema, createPost)

// Update post
// JWT
postRoutes.put('/:id', updatePost)

// Delete post
// JWT
postRoutes.delete('/:id', deletePost)

export default postRoutes
