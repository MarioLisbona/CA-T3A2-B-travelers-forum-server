import { MemberModel } from '../models/member.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

// Route to register a new member. Takes username and password
const registerMember = async (req, res) => {
    try {
        // Destructure request body
    const { username, password } = req.body
        // Check that a username and password are in the request body
        if (!(username && password)) {
            res.status(400).send({ error: "Username and password required" })
        }
        // Check username against DB to see if it exists
        const memberExists = await MemberModel.findOne({ username: username })
        // If member exists, prompt login
        if (memberExists) {
            return res.status(403).send({ error: "Username taken" })
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
}

// Route to login an already registered member
const loginMember = async (req, res) => {
    try {
        const { username, password } = req.body
        const member = await MemberModel.findOne({ username: username })
        if (!member) {
            res.status(400).send({ error: 'User does not exist' })
        }
        const checkPassword = await bcrypt.compare(password, member.password) 
        if (!checkPassword ) {
            res.status(400).send({ error: 'Incorrect password' })
        }
        else {
        const accessToken = createToken(member)
        delete member.password
        res.status(200).send({ 
            member: member._id, 
            username: member.username,
            token: accessToken
        })
    }
    } catch (err) {
    res.status(400).send({ error: err.message })
    }
}

// Create JWT token using env secret key
const createToken = (member) => {
    // Sign token using username and id so they can be accessed later
    const accessToken = jwt.sign({
        id: member._id
    }, process.env.JWT_SECRET)
    return accessToken
}

export { registerMember, loginMember }