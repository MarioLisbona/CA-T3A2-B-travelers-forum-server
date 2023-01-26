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
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

const getCategory = async (req, res) => {
    try {
        const postCategory = await PostModel
            .find({ category: req.params.category })
            .sort({ date_posted: 'desc' })
            .populate({ path: 'author', select: 'username' })
            .populate({ path: 'comments', populate: {
                path: 'author', select: 'username'
            }})
        if (postCategory) {
            res.status(201).send(postCategory)
        } 
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

const createPost = async (req, res) => {
    const { title, author, category, content  } = req.body
    const insertPost = await PostModel.create({ 
        title, 
        author: req.id || author, 
        category, 
        content
    })
    res.status(201).send(await insertPost.populate({ path: 'author', select: 'username' }))
}

export { getAllPosts, getPost, getCategory, createPost }