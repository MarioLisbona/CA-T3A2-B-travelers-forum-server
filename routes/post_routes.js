import express from 'express'
import { PostModel } from '../models/post.js'

const postRoutes = express.Router()

postRoutes.get('/', async (req, res) => res.send(await PostModel.find().populate({path: 'author', select: 'username'})))




export default postRoutes
