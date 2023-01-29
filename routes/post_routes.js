import express from 'express'
import { validateId, validateCategory, validatePost, validateRequestSchema } from '../middleware/validation_middleware.js'
import { getAllPosts, getPost, getCategory, createPost, updatePost, deletePost } from '../controllers/post_controller.js'
// import { validateToken } from '../middleware/auth_middleware.js'

const postRoutes = express.Router()

// GET route to get all posts
postRoutes.get('/', 
    getAllPosts
    )

// GET route to get one post with id
postRoutes.get('/:id', 
    validateId, 
    validateRequestSchema, 
    getPost
    )

// GET route to get all posts in a category
postRoutes.get('/category/:category', 
    validateCategory, 
    validateRequestSchema, 
    getCategory
    )

// POST route to create a new post
// Still needs JWT
postRoutes.post('/new', 
    // validateToken,
    validatePost, 
    validateRequestSchema, 
    createPost
    )

// PUT route to edit a post
// Still needs JWT
postRoutes.put('/:id', 
    // validateToken,
    validateId, 
    validatePost,
    validateRequestSchema, 
    updatePost
    )

// DELETE route to remove a post
// Still needs JWT
postRoutes.delete('/:id', 
    // validateToken,
    validateId, 
    validateRequestSchema, 
    deletePost
    )

export default postRoutes
