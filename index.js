import app from './app.js'
import { PORT } from './db.js'
import dotenv from 'dotenv'

dotenv.config()

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})
