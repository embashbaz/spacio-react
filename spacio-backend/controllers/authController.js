const authServices = require('../services/authServices')
const SystemUser = require('../models/systemUser')


const authRouter = require('express').Router()
const bcrypt = require('bcrypt')




authRouter.post('/login', async (request, response) => {
  const { email, password } = request.body
  const user = await SystemUser.findOne({ email: email })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)


  if(!user.id || !passwordCorrect){
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const resp = await authServices.generateToken(user.id)
  if(!resp){
    return response.status(500).json({
      error: 'Something went wrong'
    })
  }

  response
    .status(200)
    .send(resp)

})


authRouter.post('/register', async (request, response ) => {
  const { firstName, lastName, email, password, } = request.body

  const userByEmail = await SystemUser.findOne({ email: email })
  if(userByEmail){
    return response.status(400).json({
      error: 'User with email already exit'
    })
  }
  const encrypPassword = await authServices.encrypPassword(password)
  const user = new SystemUser({
    firstName: firstName,
    lastName: lastName,
    passwordHash: encrypPassword

  })

  const savedUser = await user.save()
  const resp = await authServices.generateToken(savedUser.id)
  if(!resp){
    return response.status(500).json({
      error: 'Something went wrong'
    })
  }

  response
    .status(201)
    .send(resp)
})



