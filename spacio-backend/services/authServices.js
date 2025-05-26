const SystemUser = require('../models/systemUser')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

let generateToken = async (userId) => {
  const user = await SystemUser.findById(userId)

  if(user){
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(userForToken, config.TOKEN_SECRET, { expiresIn: 2*60*60 })
    return { token, user: user }
  }
  return null
}


let encrypPassword = async (password) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  return passwordHash
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

let getUserFromRequestToken = async (request) => {
  const token = getTokenFrom(request)
  if(!token)
    return null
  const decodedToken = jwt.verify(token, config.TOKEN_SECRET)
  if (!decodedToken.id) {
    return null
  }
  const user = await SystemUser.findById(decodedToken.id)

  if (!user) {
    return null
  }
  return user
}


module.exports = { generateToken, encrypPassword, getUserFromRequestToken }