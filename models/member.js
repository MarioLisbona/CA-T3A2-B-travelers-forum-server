import mongoose from 'mongoose'

// Converting date to Sydney
const utcTime = new Date()
const sydTime = utcTime.setUTCHours(11)

// Create a Mongoose schema to define the structure of a model
const memberSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    joined_date: { 
        type: Date, 
        default: Date.now,
        required: true 
    }
  })

// Create a Mongoose model based on the schema
const MemberModel = mongoose.model('Member', memberSchema)

export { MemberModel }
