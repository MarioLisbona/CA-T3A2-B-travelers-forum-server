import jwt from 'jsonwebtoken'
import { PostModel } from '../models/post.js'
import { CommentModel } from '../models/comment.js'
import { MemberModel } from '../models/member.js'

// Check JWT token is valid
const validateToken = async (req, res, next) => {
    try {
        // Set the JWT token in the authorization header to acessToken variable
        let accessToken = req.headers["authorization"]

        // If no access token exists in the header, return error message access denied
        if (!accessToken || accessToken === 'Bearer undefined') {
            return res.status(403).send({ error: "Access denied." })
        }

        // Trim any noise from the bearer token so it is readaable
        if (accessToken.startsWith("Bearer ")) {
            accessToken = accessToken.slice(7, accessToken.legth).trimLeft()
        }

        // Use JWT to verify the access token using env secret key
        const validToken = jwt.verify(accessToken, process.env.JWT_SECRET)

        // Hand the valid token to the request so user id can be accessed by route 
        req.member = validToken

        // Call the next middleware
        next()
    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
}

// Checking that the Member exists in the DB. A valid JWT belonging to a no longer existing 
// Member will populate the author field with null otherwise when creating posts or comments
const validateMemberExists = async (req, res, next) => {
    const member = await MemberModel.findById(req.member.id)
    if (!member) {
        return res.status(403).send({ error: "Access denied." })
    }
    next()
}

const validatePostAuthor = async (req, res, next) => {
    const post = await PostModel.findById(req.params.id)
    if (post.author._id != req.member.id) {
        return res.status(403).send({ error: 'Access Denied. You are not the owner of this post'})
    }
    next()
}

const validateCommentAuthor = async (req, res, next) => {
    const comment = await CommentModel.findById(req.params.id)
    if (comment.author._id != req.member.id) {
        return res.status(403).send({ error: 'Access Denied. You are not the owner of this comment'})
    }
    next()
}

export { validateToken, validateMemberExists, validatePostAuthor, validateCommentAuthor }
