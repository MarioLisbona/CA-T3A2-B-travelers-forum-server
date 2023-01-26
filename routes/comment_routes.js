import express from 'express'
import { CommentModel } from '../models/comment.js'
import { PostModel } from '../models/post.js'
import { validateToken } from './auth_routes.js'

const commentRoutes = express.Router()

// Create comment
commentRoutes.post('/new', async (req, res) => {
    try {
        const { post, author, content  } = req.body
        const insertComment = await CommentModel.create({ 
            post: post,
            author: req.id || author, 
            content: content
        })
        await PostModel.findByIdAndUpdate(post, {"$push": {comments: insertComment._id}})

        res.status(201).send(await insertComment
            .populate({ path: 'author', select: 'username' }))
        }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})


export default commentRoutes
