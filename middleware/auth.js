import { param, body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

// Check JWT token is valid
const validateToken = (req, res, next) => {
    try {
        let accessToken = req.headers["authorization"]
        if (!accessToken) {
            return res.status(403).json({ error: "Access denied" })
        }
        if (accessToken.startsWith("Bearer ")) {
            accessToken = accessToken.slice(7, accessToken.legth).trimLeft()
        }
        const validToken = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.member = validToken
        next()
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
}

const validateRequestSchema = function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

const validateId = [
    param('id')
    .exists().withMessage('Id is required')
    .isMongoId().withMessage('Invalid id')
] 

const categories = ['Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Australia']

const validateCategory = [
    param('category')
    .isIn(categories).withMessage('Invalid category')
]

const validatePost = [
    body('title')
    .exists().withMessage('Title is required')
    .isLength({ max: 50 }).withMessage('Max title length is 50 characters'),
    body('category')
    .isIn(categories).withMessage('Invalid category'),
    body('content')
    .exists().withMessage('Content is required')
    .isLength({ max: 10000 }).withMessage('Max post length is 10000 characters')
]

const validateComment = [
    body('post')
    .isMongoId().withMessage('Invalid id'),
    body('content')
    .exists().withMessage('Content is required')
    .isLength({ max: 1000 }).withMessage('Max comment length is 1000 characters')
]

const validateUsernamePassword = [
    body('username')
    .exists().withMessage('Username Required'),
    body('password')
    .exists().withMessage('Password Required')
]

const validateStrongPassword = [
    body('password')
    .isStrongPassword().withMessage(
        'Password must be atleast 8 characters; 1 uppercase, 1 lowercase, 1 number and 1 symbol'
        )
]

export { validateId, validateCategory, validatePost, validateComment, validateUsernamePassword, validateStrongPassword, validateToken, validateRequestSchema }
