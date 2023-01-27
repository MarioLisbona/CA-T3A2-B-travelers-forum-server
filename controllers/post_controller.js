import { PostModel } from "../models/post.js"

const getAllPosts = async (req, res) => {
    try {
        const allPosts = await PostModel
            .find().sort({ date_posted: 'desc' })
            .populate({ path: 'author', select: 'username' })
            .populate({ path: 'comments', populate: {
                path: 'author', select: 'username'
            }})
        res.status(201).send(allPosts)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

const getPost = async (req, res) => {
    try {
        const post = await PostModel
            .findById(req.params.id)
            .populate({ path: 'author', select: 'username' })
            .populate({ path: 'comments', populate: {
                path: 'author', select: 'username'
            }})
        if (post) {
            res.status(201).send(post)
        } 
        else {
            res.status(404).send({ error: `Post with id: ${req.params.id} does not exist` })
        }
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

const getCategory = async (req, res) => {
    try {
        const posts = await PostModel
            .find({ category: req.params.category })
            .sort({ date_posted: 'desc' })
            .populate({ path: 'author', select: 'username' })
            .populate({ path: 'comments', populate: {
                path: 'author', select: 'username'
            }})
        if (posts) {
            res.status(201).send(posts)
        } 
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

const createPost = async (req, res) => {
    try {
        const { title, author, category, content  } = req.body
        const insertPost = await PostModel.create({ 
            title, 
            author: req.id || author, 
            category, 
            content
        })
        if (insertPost) {
            res.status(201).send(await insertPost
                .populate({ path: 'author', select: 'username' }))
        }
        else {
            res.status(400).send({ error: 'Timed out' })
        }
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

const updatePost = async (req, res) => {
    try {
        const { title, category, content  } = req.body
        const updatedPost = { title, category, content }
        const post = await PostModel
        .findByIdAndUpdate(req.params.id, updatedPost, 
            { returnDocument: 'after' })
            
        if (post) {
            res.status(201).send(await post
                .populate({ path: 'author', select: 'username' }))
        }
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await PostModel.findByIdAndDelete(req.params.id)
        if (post) {
            res.sendStatus(204)
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}

export { getAllPosts, getPost, getCategory, createPost, updatePost, deletePost }