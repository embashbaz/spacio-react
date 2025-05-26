const entriesRouter = require('express').Router()

const authServices = require('../services/authServices')
const personServices = require('../services/personServices')
const Entry = require('../models/entry')

const Person = require('../models/person')
const Vehicle = require('../models/vehicle')

const logger = require('../utils/logger')

entriesRouter.post('/', async (req, res, next) => {
  try {
    const user = await authServices.getUserFromRequestToken(req)
    if(!user){
      throw 'JsonWebTokenError'
      // return res.status(401).json({ error: 'token invalid' })
    }

    const { timeIn,
      timeOut,
      flagged,
      noteIn,
      noteOut,

      personFirstName,
      personLastName,
      personEmail,
      personPhoneNumber,

      vehicleBrand,
      vehiclePlate
    } = req.body

    let vehicleId = null


    if(vehicleBrand || vehiclePlate){
      const vehicle = await new Vehicle({ carBrandInfo: vehicleBrand, plate: vehiclePlate })
      vehicleId = vehicle._id
    }

    const person = await personServices.addPerson(
      personFirstName, personLastName, personEmail, personPhoneNumber
    )

    const entry = new Entry({
      timeIn: timeIn,
      timeOut: timeOut,
      noteIn: noteIn,
      noteOut: noteOut,
      flagged: flagged,
      person: person._id,
      vehicle: vehicleId
    })

    const savedEntry = await entry.save()

    res.status(200).json(savedEntry)


  } catch (error) {
    next(error)
  }

})


entriesRouter.get('/', async (req, res, next) => {
  try {
    const user = await authServices.getUserFromRequestToken(req)
    if(!user){
      throw 'JsonWebTokenError'
    }

    const term = req.query.term?.trim()
    const page = Math.max(1, parseInt(req.query.page)) || 1
    const limit = Math.max(1, parseInt(req.query.limit)) || 10
    const skip = (page - 1) * limit

    let query = {}

    if (term) {
      // Escape special regex characters
      const escapeRegex = (input) => input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(escapeRegex(term), 'i')

      // Find matching persons
      const matchingPersons = await Person.find({
        $or: [
          { firstName: regex },
          { lastName: regex },
          { email: regex },
          { phoneNumber: regex }
        ]
      }).select('_id')

      const personIds = matchingPersons.map(p => p._id)

      query.person = { $in: personIds }
    }

    const entries = await Entry.find(query)
      .populate('vehicle')
      .populate('person')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) // Optional: newest first

    res.status(200).json(
      entries
    )

  } catch (error) {
    next(error)
  }
})



entriesRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await authServices.getUserFromRequestToken(req)
    if(!user){
      throw 'JsonWebTokenError'
    }
    const entry = await Entry.findById(req.params.id)
      .populate('vehicle')
      .populate('person')

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' })
    }

    res.json(entry)
  } catch (error) {
    next(error)
  }
})


entriesRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedData = req.body
    const user = await authServices.getUserFromRequestToken(req)
    if(!user){
      throw 'JsonWebTokenError'
    }

    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    )
      .populate('vehicle')
      .populate('person')

    if (!updatedEntry) {
      return res.status(404).json({ error: 'Entry not found' })
    }

    res.json(updatedEntry)
  } catch (error) {
    next(error)
  }
})


entriesRouter.delete('/:id', async (req, res, next) => {
  try {
    const user = await authServices.getUserFromRequestToken(req)
    if(!user){
      throw 'JsonWebTokenError'
    }

    const deletedEntry = await Entry.findByIdAndDelete(req.params.id)

    if (!deletedEntry) {
      return res.status(404).json({ error: 'Entry not found' })
    }

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = entriesRouter
