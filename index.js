import app from './app.js'
// import http from 'http'

// const server = http.createServer(app)

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
})
