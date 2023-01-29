import express from 'express'
import { createComment } from '../controllers/comment_controller.js'
import { validateComment, validateRequestSchema } from '../middleware/validation_middleware.js'
// import { validateToken } from '../middleware/auth_middleware.js'

const commentRoutes = express.Router()

// POST route for creating new Comment
// Still need to add JWT
commentRoutes.post('/new',
    // validateToken,
    validateComment,
    validateRequestSchema,
    createComment
    )

export default commentRoutes
