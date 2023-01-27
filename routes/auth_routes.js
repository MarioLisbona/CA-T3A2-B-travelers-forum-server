import express from 'express'
import { registerMember, loginMember } from '../controllers/auth_controller.js'
import { validateUsernamePassword, validateStrongPassword, validateRequestSchema } from '../middleware/auth.js'

const authRoutes = express.Router()

authRoutes.post("/register", 
    validateUsernamePassword, 
    validateStrongPassword,
    validateRequestSchema, 
    registerMember
    )

authRoutes.post("/login", 
    validateUsernamePassword, 
    validateRequestSchema, 
    loginMember
    )

export { authRoutes }
