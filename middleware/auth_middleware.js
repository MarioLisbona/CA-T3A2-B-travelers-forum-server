import jwt from 'jsonwebtoken'
import { PostModel } from '../models/post.js'
import { CommentModel } from '../models/comment.js'

// Check JWT token is valid
const validateToken = (req, res, next) => {
    try {
        // Set the JWT token in the authorization header to acessToken variable
        let accessToken = req.headers["authorization"]
        // If no access token exists in the header, return error message access denied
        if (!accessToken || accessToken === 'Bearer undefined') {
            return res.status(403).json({ error: "Access denied." })
        }
        // Trim any noise from the bearer token so it is readaable
        if (accessToken.startsWith("Bearer ")) {
            accessToken = accessToken.slice(7, accessToken.legth).trimLeft()
        }
        // Use JWT to verify the access token using env secret key
        const validToken = jwt.verify(accessToken, process.env.JWT_SECRET)
        // Hand the valid token to the request so it user id can be accessed by route
        req.member = validToken
        // Call the next middleware
        next()
    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
}

// const validatePostAuthor = async (req, res, next) => {
//     const findAuthor = await PostModel.findById(req.params.id)
//     console.log(findAuthor._id)
//     if (findAuthor._id != req.member.id) {
//         return res.status(403).send({ error: 'Access Denied. You are not the owner of this post'})
//     }
//     next()
// }

// const validateCommentAuthor = async (req, res, next) => {
//     const findAuthor = await CommentModel.findById(req.params.id)
//     if (findAuthor._id != req.member.id) {
//         return res.status(403).send({ error: 'Access Denied. You are not the owner of this comment'})
//     }
//     next()
// }



export { validateToken }
