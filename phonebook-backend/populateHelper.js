const Person = require('./models/persons')
const mongoose = require('mongoose')

const populate = () => {
    let persons = [
        {
          name: 'Arto Hellas',
          number: '040-123456',
        },
        {
          name: 'Ada Lovelace',
          number: '39-44-5323523',
        },
        {
          name: 'Dan Abramov',
          number: '12-43-234345',
        },
        {
          name: 'Mary Poppendieck',
          number: '39-23-6423122',
        }
      ]
  
      console.log('Populating database')
    
  persons.forEach(person => {
          const newPerson = new Person(person)
          newPerson.save()
  })
  }

  module.exports = populate