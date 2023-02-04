import mongoose from 'mongoose'

const opts = { toJSON: { virtuals: true }, id: false }
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
        default: Date.now,
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
    rating: [{
        type: Number,
    }]
}, opts)

postSchema.virtual('calculated_rating').get(function() {
    const sum = this.rating.reduce((a, b) => a + b, 0)
    const avg = Number((sum / this.rating.length).toFixed(1)) || 0
    return avg
})

// Create a Mongoose model based on the schema to be used by express
const PostModel = mongoose.model('Post', postSchema)

export { PostModel }
