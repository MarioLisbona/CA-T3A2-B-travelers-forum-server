import mongoose from 'mongoose'

const { ATLAS_DB_URI } = process.env.

exports.connect = () => {
  mongoose
    .connect(ATLAS_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Connected to database")
    })
    .catch((error) => {
      console.log("Connection failed. Exiting...")
      console.error(error)
      process.exit(1)
    })
}
