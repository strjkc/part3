require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons')
const populate = require('./populateHelper')

const app = express()

const PORT = process.env.PORT || 3001


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
morgan.token('data', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


/* populate database */
Person.find({}).then(response => {
  if(response.length < 2)
    populate()
})
/* populate database */


app.get('/api/persons', (request, response) => {
  Person.find({})
  .then(
    DBresponse => {console.log(DBresponse); response.json(DBresponse) }
  )
} )

app.get('/info', (request, response) => response.send(`Phonebook has info for ${persons.length} people
<br><br>
${Date()}`))

app.get('/api/persons/:id', (request, response) => {
  const foundPerson = persons.find(person => person.id === Number(request.params.id))
  if (foundPerson)
    response.json(foundPerson)
  else
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(DBresponse => {
      response.status(204).end()
    } 
      )

})

app.post('/api/persons', (request, response) => {
  const data = request.body
  if (!data.name || !data.number)
    response.status(400).json({error: 'content missing'})
  else {
    const newPerson = new Person({...data})
    newPerson.save()
      .then( DBresponse => {
        console.log('Database Response: ', DBresponse)
        response.json(DBresponse)}
      )
  }
})

app.listen(PORT, () => console.log('app listening on port ', PORT))