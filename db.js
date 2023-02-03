import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', true)

// const { API_PORT } = process.env
const PORT = process.env.API_PORT || 0

// Disconnect from database
async function dbClose() {
    await mongoose.connection.close()
    console.log("Database disconnected!")
}

// Connect to database 
async function dbConnect (databaseURL) {
    try {
        const connect = await mongoose.connect(databaseURL, { useNewUrlParser: true })
        // console.log(connect.connection.readyState === 1 ? 'Mongoose connected to database' : 'Mongoose failed to connect to database')
    }
    catch (error) {
        console.error(error)
    }
}

export { dbConnect, dbClose, PORT }
