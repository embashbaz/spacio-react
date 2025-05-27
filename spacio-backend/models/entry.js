const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const entrySchema = new mongoose.Schema({

  timeIn: {
    type: Number,
    required: true
  },
  timeOut: Number,
  flagged: Boolean,
  noteIn: String,
  noteOut: String,
  isOut: Boolean,
  vehicle:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
      },
  person:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
      },
}, {
  timestamps: true
})

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Entry', entrySchema)