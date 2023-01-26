import express from 'express'
import { MemberModel } from '../models/member.js'

const getMembers = async (req, res) => {
    try {
        const allMembers = await MemberModel
            .find().select('username joined_date')
        res.status(201).send(allMembers)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}

const getMember = async (req, res) => {
    try {
        const member = await MemberModel
        .findById(req.params.id).select('username joined_date')
        if (member) {
            res.status(201).send(member)
        } 
        else {
            res.status(404).send({ error: 'Member not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}

export { getMembers, getMember }