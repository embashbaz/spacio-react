const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 1,
    required: true
  },
  address: {
    type: String,
    minLength: 1,
    required: true
  },
}, {
  timestamps: true
})

organisationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Organisation', organisationSchema)