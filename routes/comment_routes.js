import express from 'express'
import { createComment } from '../controllers/comment_controller.js'
import { validateComment, validateRequestSchema } from '../middleware/auth.js'

const commentRoutes = express.Router()

// Create comment
// Still need to add JWT
commentRoutes.post('/new',
    validateComment,
    validateRequestSchema,
    createComment
    )

export default commentRoutes
