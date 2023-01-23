import express from 'express'
import { MemberModel } from '../models/member.js'

const memberRoutes = express.Router()

memberRoutes.get('/', async (req, res) => res.send(await MemberModel.find().select('username email joined_date')))

memberRoutes.get('/:id', async (req, res) => res.send(await MemberModel.find().select('username email joined_date')))

export default memberRoutes
