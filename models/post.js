import mongoose from 'mongoose'

// Converting date to Sydney
const utcTime = new Date()
const sydTime = utcTime.setUTCHours(11)


// Create a Mongoose schema to define the structure of a model
const postSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: mongoose.Schema.ObjectId,
        ref: 'Member', 
        required: true
    },
    date_posted: { 
        type: Date, 
        default: sydTime,
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    comments: [{ 
        type: mongoose.ObjectId, 
        ref: 'Comment',
    }],
  })

// Create a Mongoose model based on the schema
const PostModel = mongoose.model('Post', postSchema)

export { PostModel }
