import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// Import models
// require("db.js").connect()

const app = express()

app.use(cors())

dotenv.config()

app.use(express.json())

// Blueprints here

// Test route 
app.get('/', (request, response) => response.send({ test_response: 'Test GET Request successful' }))

export default app
