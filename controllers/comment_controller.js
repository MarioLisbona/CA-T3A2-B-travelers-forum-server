import { CommentModel } from '../models/comment.js'
import { PostModel } from '../models/post.js'

// Create new Comment in DB
const createComment = async (req, res) => {
    try {
        // Destructure request body to get post, author and content
        const { post, content  } = req.body

        // Create new comment with post, author and content
        const insertComment = await CommentModel.create({ 
            post: post,
            author: req.member.id,
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

// Update an existing post in the DB
const updateComment = async (req, res) => {
    try {
        // Destructure request body to get title, category and content
        const { content  } = req.body

        // Create an object with title category and content
        const updatedComment = { content }

        // Find a Comment matching the id param then update its fields matching the
        // fields in the updatedComment object
        const comment = await CommentModel
        .findByIdAndUpdate(req.params.id, updatedComment, 
            { returnDocument: 'after' })
            .populate({ path: 'author', select: 'username' })
        return res.status(200).send(comment)
            
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

// Delete an existing post from the DB
const deleteComment = async (req, res) => {
    try {
        // If a post with id matching the param id is found, delete it
        const comment = await CommentModel.findByIdAndDelete(req.params.id)

        // If the post was deleted, sent 204 status as success
        if (comment) {
            res.sendStatus(204)
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}

export { createComment, updateComment, deleteComment }