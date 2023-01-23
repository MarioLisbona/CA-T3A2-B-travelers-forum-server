import express from 'express'
import { PostModel } from '../models/post.js'

const postRoutes = express.Router()

// Get all posts
postRoutes.get('/', async (req, res) => res.send(await PostModel.find().populate({path: 'author', select: 'username'})))

// Get single post by id
postRoutes.get('/:id', async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id).populate({ path: 'author', select: 'username' })
            if (post) {
                res.send(post)
            } 
            else {
                res.status(404).send({ error: 'Post not found' })
            }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})


export default postRoutes
