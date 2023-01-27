import express from 'express'
import { registerMember, loginMember } from '../controllers/auth_controller.js'
import { validateUsernamePassword, validateStrongPassword, validateRequestSchema } from '../middleware/auth.js'

const authRoutes = express.Router()

// POST route for creating new member
authRoutes.post("/register", 
    validateUsernamePassword, 
    validateStrongPassword,
    validateRequestSchema, 
    registerMember
    )

// POST route for logging in Member
authRoutes.post("/login", 
    validateUsernamePassword, 
    validateRequestSchema, 
    loginMember
    )

export default authRoutes
