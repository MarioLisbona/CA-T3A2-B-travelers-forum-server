import app from './app.js'

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
})
