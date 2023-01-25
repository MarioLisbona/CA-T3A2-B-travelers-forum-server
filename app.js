import express from 'express'
import cors from 'cors'
import postRoutes from './routes/post_routes.js'
import memberRoutes from './routes/member_routes.js'
import { authRoutes } from './routes/auth_routes.js'
import { MemberModel } from './models/member.js'
import { dbConnect } from './db.js'
// Import models

dbConnect()

const app = express()

app.use(cors())

app.use(express.json())

// Blueprints here
app.use('/posts', postRoutes)
app.use('/members', memberRoutes)
app.use('/auth', authRoutes)

// Test routes
app.get('/', (req, res) => res.send({ test_response: 'Test GET Request successful' }))

export default app
