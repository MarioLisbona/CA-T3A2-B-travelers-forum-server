import express from 'express'
import { MemberModel } from '../models/member.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authRoutes = express.Router()

// Create JWT token using env secret key
const createToken = (member) => {
    // Sign token using username and id so they can be accessed later
    const accessToken = jwt.sign({
        username: member.username,
        id: member._id
    }, process.env.JWT_SECRET)
    return accessToken
}

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

// Route to register a new member. Takes username and password
authRoutes.post("/register", async (req, res) => {
    try {
        // Destructure request body
    const { username, password } = req.body
        // Check that a username and password are in the request body
        if (!(username && password)) {
            res.status(400).send({ error: "Username and password required" })
        }
        // Check username against DB to see if it exists
        const memberExists = await MemberModel.findOne({ username })
        // If member exists, prompt login
        if (memberExists) {
            return res.status(403).send({ error: "Member Already Exist. Please Login" })
        }
        // Encrypt password for DB storage using bcrypt
        const encryptedPassword = await bcrypt.hash(password, 10)
        // Create the new Member instance in the DB
        const member = await MemberModel.create({
            username: username,
            password: encryptedPassword
        })
        // Create an access token for authentication 
        const accessToken = createToken(member)
        // Return the member id, username and token
        res.status(201).send({ 
            id: member.id,
            username: member.username,
            token: accessToken
        })
    } 
    catch (err) {
        console.log(err)
    }
})

// Route to login an already registered member
authRoutes.post("/login", async (req, res) => {
    try {
        // Destructure request body
        const { username, password } = req.body
        // Check that a username and password are in the request body
        if (!(username && password)) {
            res.status(400).send({ error: "Username and password required" })
        }
        // Find a member in the DB with a matching username
        const member = await MemberModel.findOne({ username })
        // If member was found, compare password against hashed password in DB using bcrypt compare
        if (member && (await bcrypt.compare(password, member.password))) {
            // If the passwords match, create an access token
            const accessToken = createToken(member)
        // Return the member id, username and token 
        res.status(201).send({ 
            id: member.id,
            username: member.username,
            token: accessToken
            })
        }
    } catch (err) {
    res.status(400).send({ error: err.message })
    }
})

export { validateToken, authRoutes }
