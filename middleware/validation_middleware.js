import { param, body, validationResult } from 'express-validator'

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

export { validateId, validateCategory, validatePost, validateComment, validateUsernamePassword, validateStrongPassword, validateRequestSchema }
