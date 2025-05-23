require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const TOKEN_SECRET = process.env.TOKEN_SECRET

module.exports = { MONGODB_URI, PORT, TOKEN_SECRET }