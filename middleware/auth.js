import express from 'express'
import { body, validationResult } from 'express-validator'
import { MemberModel } from '../models/member'

// function validateRequestSchema(req, res, next) {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//     }
// }

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



export { validateRequestSchema }