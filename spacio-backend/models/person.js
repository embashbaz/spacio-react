const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 1,
    required: true
  },
  lastName: {
    type: String,
    minLength: 1,
    required: true
  },
  email: {
    type: String,
    validate: {
      validator: function(v){
        return emailRegex.test(v)
      },
      message: props => `${props.value} is not a valid email address!`,
      required: false

    }
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v){
        return /^\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`,
      required: false

    }
  },
  IdNumber: String,
  type: String,
  isStandAlone: Boolean,
  org:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organisation'
    },

}, {
  timestamps: true
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)