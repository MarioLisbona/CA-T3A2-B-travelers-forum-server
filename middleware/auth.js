import express from 'express'
import { body, validationResult } from 'express-validator'
// import { MemberModel } from '../models/member.js'

const validateRequestSchema = function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

const categories = ['Asia', 'Africa', 'North America', 'South America', 'Antarctica', 'Europe', 'Australia']

const validatePost = [
    body('title')
    .exists().withMessage('Title is required')
    .isLength({ max: 50 })
    .withMessage('Max title length is 50 characters'),
    body('author')
    .exists().withMessage('Author is required')
    .isMongoId()
    .withMessage('Invalid member id'),
    body('category')
    .exists().withMessage('Category is required')
    .isIn(categories)
    .withMessage('Invalid category'),
    body('content')
    .exists().withMessage('Content is required')
    .isLength({ max: 10000 })
    .withMessage('Max post length is 10000 characters')
]

// async function isValidMember(mongId) {
//     const result = await this.findById(mongId)
//     if (!result) {
//         throw new Error('You are not a member')
//     }
// }

// async function validateUserExists(value) {
//     body(value)
//     .isMongoId()
//     .custom(value => await MemberModel.findById(value))
//     if (!value) {

//     }
// }



export { validatePost, validateRequestSchema }