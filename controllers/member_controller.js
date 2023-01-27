import { MemberModel } from '../models/member.js'

// Retrieve all Members from DB
const getMembers = async (req, res) => {
    try {
        // Find all members and exclude password field
        const allMembers = await MemberModel
            .find().select('username joined_date')
        // Return all members
        return res.status(201).send(allMembers)
    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
}

// Retrieve one Member using id param
const getMember = async (req, res) => {
    try {
        // Find one Member that matches the id passed as param
        const member = await MemberModel
        .findById(req.params.id).select('username joined_date')
        if (member) {
            return res.status(201).send(member)
        } 
        // If no member with id found, return error message member not found
        else {
            return res.status(404).send({ error: 'Member not found' })
        }
    }
    catch (err) {
        return res.status(500).send({ error: err.message })
    }
}

export { getMembers, getMember }