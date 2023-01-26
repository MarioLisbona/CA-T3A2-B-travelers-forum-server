import { PostModel } from "../models/post.js"

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

export { createPost }