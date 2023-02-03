import { MemberModel } from '../models/member.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

// Create new Member in DB
const registerMember = async (req, res) => {
    try {
        // Destructure request body to get username and password
        const { username, password } = req.body
        // Check if member exists with matching username, if so, return error message username taken
        const memberExists = await MemberModel.findOne({ username: username })
        if (memberExists) {
            return res.status(409).send({ error: "Username taken" })
        }
        // Encrypt password using bcrypt 
        const encryptedPassword = await bcrypt.hash(password, 10)
        // Create new member with username and encrypted password
        const member = await MemberModel.create({
            username: username,
            password: encryptedPassword
        })
        // Grant new member JWT token
        const accessToken = createToken(member)
        // Return member id, username and token
        return res.status(201).send({ 
            id: member.id,
            username: member.username,
            token: accessToken
        })
    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
}

// Login an already registered member
const loginMember = async (req, res) => {
    try {
        // Destructure request body to get username and password
        const { username, password } = req.body
        // Check if member exists with matching username in db
        const member = await MemberModel.findOne({ username: username })
        if (!member) {
            return res.status(401).send({ error: 'Incorrect username or password' })
        }
        // Compare password against hashed password in DB using bcrypt
        const checkPassword = await bcrypt.compare(password, member.password) 
        // If member doesnt exist or password doesn't match, return error message incorrect credentials
        if (!checkPassword ) {
            return res.status(401).send({ error: 'Incorrect username or password' })
        }
        // If password matches, creaete new JWT token
        const accessToken = createToken(member)
        // Return member id, username and token
        return res.status(200).send({ 
            id: member._id,
            username: member.username,
            token: accessToken
        })
    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
}

// Create JWT token using env secret key
const createToken = (member) => {
    // Sign token using member  id so id can be accessed later
    const accessToken = jwt.sign({
        id: member._id
    }, process.env.JWT_SECRET, 
    {expiresIn: '1h'})
    return accessToken
}

export { registerMember, loginMember }