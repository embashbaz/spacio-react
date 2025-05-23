const Person = require('../models/person')

let addPerson = async (firstName, lastName, email, phoneNumber) => {

  const existingUserByEmail = await Person.findOne({ email: email })
  const existingByPhone = await Person.findOne({ phoneNumber: phoneNumber })

  if(existingByPhone){
    return existingByPhone
  }

  if(existingUserByEmail){
    return existingUserByEmail
  }

  const person = new Person({
    email: email,
    phoneNumber: phoneNumber,
    firstName: firstName,
    lastName: lastName
  })
  const savedP = await person.save()
  return savedP
}


let getPerson = async (term) => {
  const people = await Person.find({
    $or: [
      { firstName: { $regex: term, $options: 'i' } },
      { lastName: { $regex: term, $options: 'i' } },
      { email: { $regex: term, $options: 'i' } },
      { phoneNumber: { $regex: term, $options: 'i' } }
    ]
  })

  return people
}


module.exports = { addPerson, getPerson }