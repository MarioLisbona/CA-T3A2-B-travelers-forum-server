import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', true)

// Disconnect from Atlas database
async function dbClose() {
    await mongoose.connection.close()
    console.log("Database disconnected!")
}

// Connect to Atlas database 
async function dbConnect () {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(connect.connection.readyState === 1 ? 'Mongoose connected to database' : 'Mongoose failed to connect to database')
    }
    catch (error) {
        console.error(error)
    }
}

export { dbConnect, dbClose }
