const personRouter = require('express').Router()

const authServices = require('../services/authServices')
const personServices = require('../services/personServices')
const Person = require('../models/person')


personRouter.post('/', async (request, response) => {

  const { firstName, lastName, email, phoneNumber } = request.body

  const user = await authServices.getUserFromRequestToken(request)
  if(!user){
    throw 'JsonWebTokenError'
  }

  const savedUser = await personServices.addPerson(
    firstName,
    lastName,
    email,
    phoneNumber
  )

  response.status(200).json(savedUser)

})

personRouter.get('/', async (request, response) => {
  const { term } = request.params

  const user = authServices.getUserFromRequestToken(request)
  if(!user){
    return response.status(401).json({ error: 'token invalid' })
  }

  const people = await personServices.getPerson(term)

  response.status(200).json(people)

})

personRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await authServices.getUserFromRequestToken(req)
    if(!user){
      throw 'JsonWebTokenError'
    }
    const person = await Person.findById(req.params.id).populate('org')
    if (!person) {
      return res.status(404).json({ error: 'Person not found' })
    }
    res.status(200).json(person)
  } catch (error) {
    next(error)
  }
})

personRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedData = req.body
    const user = await authServices.getUserFromRequestToken(req)
    if(!user){
      throw 'JsonWebTokenError'
    }
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,       // return the updated document
        runValidators: true, // enforce schema validations
      }
    )

    if (!updatedPerson) {
      return res.status(404).json({ error: 'Person not found' })
    }

    res.status(200).json(updatedPerson)
  } catch (error) {
    next(error)
  }
})


personRouter.delete('/:id', async (req, res, next) => {
  try{

    const user = await authServices.getUserFromRequestToken(req)
    if(!user){
      throw 'JsonWebTokenError'
    }

    const deleted = await Person.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ error: 'Person not found' })
    }

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})


module.exports = personRouter



