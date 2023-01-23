import mongoose from 'mongoose'

// Create a Mongoose schema to define the structure of a model
const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.ObjectId, 
        ref: 'Post', 
        required: true         
    },
    author: { 
        type: mongoose.ObjectId, 
        ref: 'Member', 
        required: true 
    },
    date_posted: { 
        type: Date, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
  })

// Create a Mongoose model based on the schema
const CommentModel = mongoose.model('Comment', commentSchema)

export { CommentModel }