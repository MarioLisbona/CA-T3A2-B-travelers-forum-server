import { MemberModel } from '../models/member.js'

// Retrieve one Member using id param
const getMember = async (req, res) => {
    try {
        // Find one Member that matches the id passed as param
        const member = await MemberModel
        .findById(req.params.id).select('username joined_date has_rated')
        if (member) {
            return res.status(200).send(member)
        } 

        // If no member with id found, return error message member not found
        else {
            return res.status(404).send({ error: `Member with id: ${req.params.id} not found` })
        }
    }
    catch (err) {
        return res.status(500).send({ error: err.message })
    }
}

export { getMember }