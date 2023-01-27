import { param, body, validationResult } from 'express-validator'

// Check JWT token is valid
const validateToken = (req, res, next) => {
    try {
        // Pass the token from the header to a variable
        const accessToken = req.headers["authorization"]
        // Check the header was not empty, if so, remove noise
        if (typeof accessToken !== 'undefined') {
            const bearer = accessToken.split(' ')
            const token = bearer[1]
        // Check the token exists after cleanup
        if (!token) {
            return res.status(400).json({ error: "User not Authenticated!" })
        }
        // Verify the token using env secret key
        const validToken = jwt.verify(token, process.env.JWT_SECRET)
        if (validToken) {
                req.authenticated = true
                // Pass the user id to request so it can be accessed later
                req.id = validToken.id
                return next()
            }
        }
    }
    catch (err) {
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
    .isMongoId().withMessage('Not a valid id')
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
    body('content')
    .exists().withMessage('Content is required')
    .isLength({ max: 1000 }).withMessage('Max post length is 1000 characters')
]

export { validateId, validateCategory, validatePost, validateComment, validateToken, validateRequestSchema }