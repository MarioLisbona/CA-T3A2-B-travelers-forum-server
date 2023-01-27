import express from 'express'
import { validateId, validateCategory, validatePost, validateToken, validateRequestSchema } from '../middleware/auth.js'
import { getAllPosts, getPost, getCategory, createPost, updatePost, deletePost } from '../controllers/post_controller.js'
import jwt from 'jsonwebtoken'

const postRoutes = express.Router()

// Get all posts
postRoutes.get('/', 
    getAllPosts
    )

// Get single post by id
postRoutes.get('/:id', 
    validateId, 
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
    validateToken,
    validatePost, 
    validateRequestSchema, 
    createPost
    )

// Update post
// Still needs JWT
postRoutes.put('/:id', 
    validateId, 
    validatePost,
    validateRequestSchema, 
    updatePost
    )

// Delete post
// Still needs JWT
postRoutes.delete('/:id', 
    validateId, 
    validateRequestSchema, 
    deletePost
    )

export default postRoutes
