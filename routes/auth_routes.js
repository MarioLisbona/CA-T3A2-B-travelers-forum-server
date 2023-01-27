import express from 'express'
import { registerMember, loginMember } from '../controllers/auth_controller.js'
import { validateToken } from '../middleware/auth.js'

const authRoutes = express.Router()

authRoutes.post("/register", registerMember)

authRoutes.post("/login", loginMember)

export { validateToken, authRoutes }
