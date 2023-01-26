import express from 'express'
import { validatePostId, validateCategory, validatePost, validateRequestSchema } from '../middleware/auth.js'
import { getAllPosts, getPost, getCategory, createPost, updatePost, deletePost } from '../controllers/post_controller.js'

const postRoutes = express.Router()

// Get all posts
postRoutes.get('/', 
    getAllPosts
    )

// Get single post by id
postRoutes.get('/:id', 
    validatePostId, 
    validateRequestSchema, 
    getPost
    )

// Get all posts in a category
postRoutes.get('/category/:category', 
    validateCategory, 
    validateRequestSchema, 
    getCategory
    )

// Post new post
// Still needs JWT
postRoutes.post('/new', 
    validatePost, 
    validateRequestSchema, 
    createPost)

// Update post
// Still needs JWT
postRoutes.put('/:id', 
    validatePostId, 
    validatePost,
    validateRequestSchema, 
    updatePost
    )

// Delete post
// Still needs JWT
postRoutes.delete('/:id', 
    validatePostId, 
    validateRequestSchema, 
    deletePost
    )

export default postRoutes
