import express from 'express'
import cors from 'cors'
import postRoutes from './routes/post_routes.js'
import memberRoutes from './routes/member_routes.js'
import authRoutes from './routes/auth_routes.js'
import commentRoutes from './routes/comment_routes.js'
import { dbConnect } from './db.js'


dbConnect()

const app = express()

app.use(cors())

app.use(express.json())

// Routes
app.use('/posts', postRoutes)
app.use('/members', memberRoutes)
app.use('/auth', authRoutes)
app.use('/comments', commentRoutes)

// Home Test Route
app.get('/', (req, res) => res.status(200).send({ test_response: 'Test GET Request successful' }))

export default app
