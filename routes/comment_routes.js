import express from 'express'
import { createComment, updateComment, deleteComment } from '../controllers/comment_controller.js'
import { validateComment, validateId, validateRequestSchema } from '../middleware/validation_middleware.js'
import { validateToken, validateCommentAuthor } from '../middleware/auth_middleware.js'

const commentRoutes = express.Router()

// POST route for creating new Comment
// Still need to add JWT
commentRoutes.post('/new',
    validateToken,
    validateComment,
    validateRequestSchema,
    createComment
    )

commentRoutes.put('/:id',
    validateToken,
    validateCommentAuthor,
    validateId,
    updateComment
    )

commentRoutes.delete('/:id',
    validateToken,
    validateCommentAuthor,
    validateId,
    deleteComment
    )

export default commentRoutes
