import express from 'express'
import cors from 'cors'
import postRoutes from './routes/post_routes.js'
import memberRoutes from './routes/member_routes.js'
import authRoutes from './routes/auth_routes.js'
import commentRoutes from './routes/comment_routes.js'
import { dbConnect } from './db.js'
import dotenv from 'dotenv'

dotenv.config()

dbConnect()

const app = express()

app.use(cors())

app.use(express.json())

// During test, the test files have their own 
// database connection management process.
// So, we don't want to connect to the database here
// during any automated testing if NODE_ENV = test.
var databaseURL = ""
switch (process.env.NODE_ENV.toLowerCase()) {
    case "development":
        databaseURL = `mongodb://localhost:27017/${process.env.npm_package_name}-${process.env.NODE_ENV.toLowerCase()}`
        break
    case "production":
        databaseURL = process.env.MONGO_URI
        break
    default:
        console.error("app.js will not connect to the database in the current NODE_ENV.")
        break
}
// const { dbConnect } = require('./mongooseConnector');
if (process.env.NODE_ENV != 'test'){
    dbConnect(databaseURL).then(() => {
        console.log("Database connected successfully!");
    }).catch(error => {
        console.log(`
        Error connecting to database: 
        ${error}
        `)
    })
}


// Mounted Routes
app.use('/posts', postRoutes)
app.use('/members', memberRoutes)
app.use('/auth', authRoutes)
app.use('/comments', commentRoutes)

// Home Test Route
app.get('/', (req, res) => res.status(200).send({ test_response: 'Test GET Request successful' }))

export default app
