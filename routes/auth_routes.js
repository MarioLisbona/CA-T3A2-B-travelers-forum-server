import express from 'express'
import { MemberModel } from '../models/member.js'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authRoutes = express.Router()

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
        
        try {
            const { username, email, password } = req.body
            // const encryptPassword = await bcrypt.hash(plainTextPassword, 10)
            const newMember = await MemberModel.create({
                username,
                email,
                password,
            })
            const token = jwt.sign(
                { user_id: newMember._id, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
            )
            newMember.token = token
            res.status(201).json(newMember)
        }
        catch (err) {
            res.status(500).send({ error: err.message })
        }
})

const jwtVerify = async (username, password) => {
    try {
        const member = await MemberModel.findOne({ username }).lean()
        if (!member) {
            return {status:'error', error:'Member not found'}
        }
        if (await bcrypt.compare(password, member.password)){
            const token = jwt.sign({ id:member._id, username: member.username, type:'member'}, process.env.TOKEN_KEY, { expiresIn: '2h'})
            return { status:'ok', data:token }
        }
        return { status:'error', error:'invalid password' }
    } catch (err) {
        console.log(err);
        return {status:'error', error:'timed out'}
    }
}

// Log in Member
// authRoutes.post(
//     '/login',
//     async (req, res) => {
//         try {
//         const { username, password } = req.body
//         const response = await jwtVerify(username, password)
//         if (response.status === 'ok') {
//             const token = jwt.sign(
//                 { user_id: newMember._id, email },
//                 process.env.TOKEN_KEY,
//                 {
//                   expiresIn: "2h",
//                 }
//             user.token = token
//             res.status(200).json(user);
//             )
//             }
//         catch (err) {
//             res.status(500).send({ error: err.message })
//         }
//     })


export default authRoutes
