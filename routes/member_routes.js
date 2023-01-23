import express from 'express'
import { MemberModel } from '../models/member.js'

const memberRoutes = express.Router()

// Get all members
memberRoutes.get('/', async (req, res) => res.send(await MemberModel.find().select('username email joined_date')))

// Get single member by id
memberRoutes.get('/:id', async (req, res) => {
    try {
        const member = await MemberModel.findById(req.params.id).select('username email joined_date')
        if (member) {
            res.send(member)
        } 
        else {
            res.status(404).send({ error: 'Member not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

export default memberRoutes
