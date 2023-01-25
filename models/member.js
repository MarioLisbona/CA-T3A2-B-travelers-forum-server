import mongoose from 'mongoose'
// import { isEmail } from 'validator'
import bcrypt from 'bcrypt'


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
        default: new Date().toJSON(),
        required: true 
    }
  })

// Hash password using bcrypt before saving to the DB
// memberSchema.pre('save', async function (next) {
//     const salt = await bcrypt.genSalt()
//     this.password = await bcrypt.hash(this.password, salt)
//     next()
// })


// Create a Mongoose model based on the schema
const MemberModel = mongoose.model('Member', memberSchema)

export { MemberModel }
