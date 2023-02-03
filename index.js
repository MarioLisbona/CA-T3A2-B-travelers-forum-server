import app from './app.js'
import { PORT } from './db.js'

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})
