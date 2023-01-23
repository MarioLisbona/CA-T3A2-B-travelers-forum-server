import express from 'express'
import cors from 'cors'
import { PostModel } from './models/post.js'
import { dbConnect } from './db.js'
// Import models

dbConnect()

const app = express()

app.use(cors())

app.use(express.json())

// Blueprints here

// Test routes
app.get('/', (req, res) => res.send({ test_response: 'Test GET Request successful' }))

app.get('/posts', async (req, res) => res.send(await PostModel.find().populate()))

export default app