import mongoose from 'mongoose'

// Create a Mongoose schema to define the structure of a model
const memberSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    joined_date: { 
        type: Date, 
        required: true 
    }
  })

// Create a Mongoose model based on the schema
const MemberModel = mongoose.model('Member', memberSchema)

export { MemberModel }
