import express from 'express'
import { MemberModel } from '../models/member.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authRoutes = express.Router()

const createToken = (member) => {
    const accessToken = jwt.sign({
        username: member.username,
        id: member._id
    }, process.env.JWT_SECRET)
    return accessToken
}

const validateToken = (req, res, next) => {
    try {
        const accessToken = req.headers["authorization"]
        if (typeof accessToken !== 'undefined') {
            const bearer = accessToken.split(' ')
            const token = bearer[1]
            if (!token) {
                return res.status(400).json({ error: "User not Authenticated!" })
            }
            const validToken = jwt.verify(token, process.env.JWT_SECRET)
            if (validToken) {
                    req.authenticated = true
                    return next()
            }
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message })
    }
}

authRoutes.post("/register", async (req, res) => {
    try {
      const { username, password } = req.body
 
      if (!(username && password)) {
        res.status(400).send({ error: "Username and password required" })
      }
  
      const memberExists = await MemberModel.findOne({ username })
  
      if (memberExists) {
        return res.status(409).send({ error: "Member Already Exist. Please Login" })
      }
      const encryptedPassword = await bcrypt.hash(password, 10)

      const member = await MemberModel.create({
        username: username,
        password: encryptedPassword
      })

      const accessToken = createToken(member)

        // res.header("authorization", accessToken, {
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        //     httpOnly: true,
        // })
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

  authRoutes.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body
  
      if (!(username && password)) {
        res.status(400).send({ error: "Username and password required" })
      }
      const member = await MemberModel.findOne({ username })
  
      if (member && (await bcrypt.compare(password, member.password))) {
        const accessToken = createToken(member)

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

// authRoutes.get('/login', validateBasicAuth, (req, res) => {
// 	let encryptedUsername = encryptString(req.userAuthDetails.username)
// 	let encryptedPassword = encryptString(req.userAuthDetails.password)

// 	let objectToTokenize = {
// 		username: encryptedUsername, 
// 		password: encryptedPassword
// 	}

// 	let userJwt = generateJWT(objectToTokenize)

// 	response.json({
// 		jwt: userJwt
// 	})
// })

// Register User
// authRoutes.post(
//     '/register', 
//     // body('username').isLength({ min: 3, max: 24 })
//     // .withMessage('Username must be 3 - 24 characters '),
//     // body('email').isEmail()
//     // .withMessage('Not a valid email address'),
//     // body('password').isStrongPassword()
//     // .withMessage('Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol'),
//     async (req, res) => {
//         // const errors = validationResult(req)
//         // if (!errors.isEmpty()) {
//         //     return res.status(400).json({ errors: errors.array() })
//         // }
//         // TODO Validate username and email are unique
//         const { username, password } = req.body
//         try {
//             const newMember = await MemberModel.create({
//                 username,
//                 password
//             })
//             let token = generateJWT(newMember)
//             // const token = createToken(newMember._id)
//             // res.cookie('jwt', token, { httpOnly: true, tokenAge: tokenAge*1000} )
//             // res.status(201).json({ newMember: newMember._id })
//             res.status(201).json(token)
//         }
//         catch (err) {
//             res.status(500).send({ error: err.message })
//         }
// })

// const jwtValidate = async (username, password) => {
//     const member = await MemberModel.findOne({ username })
//     if (member) {
//         const auth = await bcrypt.compare(password, member.password)
//         if (auth) {
//             return member
//         }
//         throw Error('Password Incorrect')
//     }
//     throw Error('Username Incorrect')
// }

// // Log in Member
// // TODO Validation
// authRoutes.post(
//     '/login',
//     async (req, res) => {
//         const { username, password } = req.body
//         try {
//             const loginMember = await jwtValidate(username, password)
//             const token = jwt.sign(
//                 { loginMember },
//                 process.env.JWT_SECRET,
//                 { expiresIn: "7d"}
//             )
//             res.status(201).json({
//                 success: true,
//                 data: {
//                     memberId: loginMember._id, 
//                     username: loginMember.username,
//                     token: token
//                 }
//             })
//             // res.cookie('jwt', token, { httpOnly: true, tokenAge: tokenAge*1000 })
//             // res.status(201).json({ member: loginMember._id, token: token });
//         }
//         catch (err) {
//             res.status(500).send({ error: err.message })
//         }
// })

export { validateToken, authRoutes }
