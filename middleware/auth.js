import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const jwtVerify = (req, res, next) => {
  const token = req.headers["authorization"]
  if (token) {
    const bearer = token.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
  }
  if (!token) {
    return res.status(403).json({ error: "Authentication token not found" })
  }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     req.member = decoded

//   } catch (err) {
//     return res.status(401).json({ error: "Invalid Token" })
//   }
  return next();
};

export default jwtVerify
