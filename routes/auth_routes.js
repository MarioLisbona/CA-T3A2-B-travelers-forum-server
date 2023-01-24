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
    body('username').isLength({ min: 3, max: 24 }),
    body('email').isEmail(),
    body('password').isStrongPassword(),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // TODO Validate username and email are unique
        
        try {
            // const encryptPassword = await bcrypt.hash(password, 10)
            const { username, email, password: plainTextPassword } = req.body
            const encryptPassword = await bcrypt.hash(plainTextPassword, 10)
            const newMember = await MemberModel.create({
                username,
                email: email.toLowerCase(),
                password: encryptPassword,
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


// const { username, email, password } = req.body
// const newMember = { username, email, password }
// const insertMember = await MemberModel.create(newMember)
// res.status(201).send(await insertMember.populate({ path: 'author', select: 'username' }))
// Log in Member
export default authRoutes
