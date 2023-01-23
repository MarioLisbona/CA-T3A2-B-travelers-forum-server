import express from 'express'
import cors from 'cors'
import postRoutes from './routes/post_routes.js'
import memberRoutes from './routes/member_routes.js'
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

// Test routes
app.get('/', (req, res) => res.send({ test_response: 'Test GET Request successful' }))

// app.get('/posts', async (req, res) => res.send(await PostModel.find().populate({path: 'author', select: 'username'})))

// app.get('/members', async (req, res) => res.send(await MemberModel.find().populate()))

export default app
