const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const PORT = 3001

let persons = [
      {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1
      },
      {
        name: 'Ada Lovelace',
        number: '39-44-5323523',
        id: 2
      },
      {
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: 3
      },
      {
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
        id: 4
      }
    ]

app.use(cors())
app.use(express.json())
morgan.token('data', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))



app.get('/api/persons', (request, response) => response.json(persons) )

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