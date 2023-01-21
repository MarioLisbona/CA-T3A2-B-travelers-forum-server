import mongoose from 'mongoose'

const { MONGO_URI } = process.env
mongoose.set('strictQuery', true)

// connect = () => {
//   mongoose
//     .connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     })
//     .then(() => {
//       console.log("Connected to database")
//     })
//     .catch((error) => {
//       console.log("Connection failed. Exiting...")
//       console.error(error)
//       process.exit(1)
//     })
// }

try {
    const connect = mongoose.connect(MONGO_URI)
    console.log(connect.connection.readyState === 1 ? 'Mongoose connected to database' : 'Mongoose failed to connect to database')
}
catch (error) {
    console.error(error)
}

async function dbClose() {
    await mongoose.connection.close()
    console.log("Database disconnected!")
  }

export { dbClose }
