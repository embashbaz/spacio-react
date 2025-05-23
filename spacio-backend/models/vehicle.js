const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const vehicleSchema = new mongoose.Schema({
  carBrandInfo: {
    type: String,
    minLength: 1,
    required: true
  },
  plate: {
    type: String,
    minLength: 1,
    required: true
  },
  org:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation'
      },
  person:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
      },
}, {
  timestamps: true
})

vehicleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Vehicle', vehicleSchema)