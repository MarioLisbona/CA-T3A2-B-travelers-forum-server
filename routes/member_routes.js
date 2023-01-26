import express from 'express'
import { getMember, getMembers } from '../controllers/member_controller.js'
import { validateId, validateRequestSchema } from '../middleware/auth.js'

const memberRoutes = express.Router()

// Get all members
memberRoutes.get('/', 
    getMembers
    )

// Get single member by id
memberRoutes.get('/:id', 
    validateId,
    validateRequestSchema,
    getMember
    )

export default memberRoutes
