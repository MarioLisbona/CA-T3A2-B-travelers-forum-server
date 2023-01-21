import express from 'express'
import dotenv from 'dotenv'
// Import models

require("db.js").connect()
const express = require("express")

const app = express()

app.use(cors())

dotenv.config()

app.use(express.json())

// Blueprints here

export default app
