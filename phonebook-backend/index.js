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
  const initialLength =  persons.length
  persons = persons.filter(person => person.id !== Number(request.params.id))
  if (initialLength > persons.length)
    response.status(204).end()
  else
    response.status(404).end()
})

app.post('/api/persons', (request, response) => {
  const data = request.body
  if (!data.name || !data.number)
    response.status(400).json({error: 'content missing'})
  else if (persons.find(person => person.name === data.name))
    response.status(400).json({error: 'name already present'})
  else {
    const idOfNewPerson = Math.floor(Math.random() * (10000000 - 1 + 1) +1)
    const newPerson = {...data, id: idOfNewPerson}
    persons.push(newPerson)
    response.json(newPerson)
  }
})

app.listen(PORT, () => console.log('app listening on port ', PORT))