import { CommentModel } from '../models/comment.js'
import { PostModel } from '../models/post.js'

// Create new Comment in DB
const createComment = async (req, res) => {
    try {
        // Destructure request body to get post, author and content
        const { post, author, content  } = req.body
        // Create new comment with post, author and content
        const insertComment = await CommentModel.create({ 
            post: post,
            author: author || req.member.id,
            content: content
        })
        // Insert the new comment's Mongoose Object id into comments array of related Post
        await PostModel.findByIdAndUpdate(post, {"$push": {comments: insertComment._id}})
        // Return comment, populating author field with authors username
        return res.status(201).send(await insertComment
            .populate({ path: 'author', select: 'username' }))

    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
}

export { createComment }