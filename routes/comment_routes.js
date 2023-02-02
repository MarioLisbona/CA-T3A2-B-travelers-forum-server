import express from 'express'
import { createComment, updateComment, deleteComment } from '../controllers/comment_controller.js'
import { validateCommentBody, validatePostExists, validateId, validateRequestSchema } from '../middleware/validation_middleware.js'
import { validateToken, validateMemberExists, validateCommentAuthor } from '../middleware/auth_middleware.js'

const commentRoutes = express.Router()

commentRoutes.post('/new',
    validateToken,
    validateMemberExists,
    validateCommentBody,
    validateRequestSchema,
    validatePostExists,
    createComment
    )

// PUT route for editing Comment
commentRoutes.put('/:id',
    validateToken,
    validateCommentAuthor,
    validateId,
    updateComment
    )

// DELETE route for deleting Comment
commentRoutes.delete('/:id',
    validateToken,
    validateCommentAuthor,
    validateId,
    deleteComment
    )

export default commentRoutes
