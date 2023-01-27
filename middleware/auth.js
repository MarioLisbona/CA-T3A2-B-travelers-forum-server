import { param, body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

// Check JWT token is valid
const validateToken = (req, res, next) => {
    try {
        // Set the JWT token in the authorization header to acessToken variable
        let accessToken = req.headers["authorization"]
        // If no access token exists in the header, return error message access denied
        if (!accessToken) {
            return res.status(403).json({ error: "Access denied" })
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

// Collects any errors from previous middleware and returns it if it exists
const validateRequestSchema = function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

// Checks id passed as param exists and is a valid Mongo Object id
const validateId = [
    param('id')
    .exists().withMessage('Id is required')
    .isMongoId().withMessage('Invalid id')
] 

// Categories array for use by validateCategory and validatePost
const categories = ['Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Australia']

// Checks category passed as param is a valid category
const validateCategory = [
    param('category')
    .isIn(categories).withMessage('Invalid category')
]

// Checks Post has valid title, cateogry and content fields
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

// Checks Comment has valid post reference and content fields
const validateComment = [
    body('post')
    .isMongoId().withMessage('Invalid id'),
    body('content')
    .exists().withMessage('Content is required')
    .isLength({ max: 1000 }).withMessage('Max comment length is 1000 characters')
]

// Checks Username and Password fields are passed for registration and login
const validateUsernamePassword = [
    body('username')
    .exists().withMessage('Username Required'),
    body('password')
    .exists().withMessage('Password Required')
]

// Checks password has min 8 characters, 1 upper, 1 lower, 1 num and 1 symbol
// before registering new Member
const validateStrongPassword = [
    body('password')
    .isStrongPassword().withMessage(
        'Password must be atleast 8 characters; 1 uppercase, 1 lowercase, 1 number and 1 symbol'
        )
]

export { validateId, validateCategory, validatePost, validateComment, validateUsernamePassword, validateStrongPassword, validateToken, validateRequestSchema }
