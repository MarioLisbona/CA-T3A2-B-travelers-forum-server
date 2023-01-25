import express from 'express'
import { MemberModel } from '../models/member.js'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authRoutes = express.Router()

// Create JWT
// expireIn: Days, hours, minutes, seconds
// const tokenAge = 1 * 24 * 60 * 60;
// const createToken = (id) => {
//     return jwt.sign({ id }, 'secret', {
//         expiresIn: tokenAge
//     })
// }

// Register User
authRoutes.post(
    '/register', 
    body('username').isLength({ min: 3, max: 24 })
    .withMessage('Username must be 3 - 24 characters '),
    body('email').isEmail()
    .withMessage('Not a valid email address'),
    body('password').isStrongPassword()
    .withMessage('Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol'),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // TODO Validate username and email are unique
        const { username, email, password } = req.body
        try {
            const newMember = await MemberModel.create({
                username,
                email,
                password
            })
            const token = jwt.sign(
                { memberId: newMember._id, username: newMember.username},
                process.env.JWT_SECRET,
                { expiresIn: "24h"}
            )
            // const token = createToken(newMember._id)
            // res.cookie('jwt', token, { httpOnly: true, tokenAge: tokenAge*1000} )
            // res.status(201).json({ newMember: newMember._id })
            res.status(201).json({
                success: true,
                data: {
                    memberId: newMember._id, 
                    username: newMember.username,
                    token: token
                }
            })
        }
        catch (err) {
            res.status(500).send({ error: err.message })
        }
})

const jwtValidate = async (username, password) => {
    const member = await MemberModel.findOne({ username })
    if (member) {
        const auth = await bcrypt.compare(password, member.password)
        if (auth) {
            return member
        }
        throw Error('Password Incorrect')
    }
    throw Error('Username Incorrect')
}

// Log in Member
// TODO Validation
authRoutes.post(
    '/login',
    async (req, res) => {
        const { username, password } = req.body
        try {
            const loginMember = await jwtValidate(username, password)
            const token = jwt.sign(
                { memberId: loginMember._id, username: loginMember.username},
                process.env.JWT_SECRET,
                { expiresIn: "24h"}
            )
            res.status(201).json({
                success: true,
                data: {
                    memberId: loginMember._id, 
                    username: loginMember.username,
                    token: token
                }
            })
            // res.cookie('jwt', token, { httpOnly: true, tokenAge: tokenAge*1000 })
            // res.status(201).json({ member: loginMember._id, token: token });
        }
        catch (err) {
            res.status(500).send({ error: err.message })
        }
})

export default authRoutes
