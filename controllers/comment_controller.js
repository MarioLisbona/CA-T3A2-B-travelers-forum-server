import express from 'express'
import { CommentModel } from '../models/comment.js'
import { PostModel } from '../models/post.js'

const createComment = async (req, res) => {
    try {
        const { post, author, content  } = req.body
        const insertComment = await CommentModel.create({ 
            post: post,
            author: author || req.member.id,
            content: content
        })
        await PostModel.findByIdAndUpdate(post, {"$push": {comments: insertComment._id}})

        return res.status(201).send(await insertComment
            .populate({ path: 'author', select: 'username' }))

    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
}

export { createComment }