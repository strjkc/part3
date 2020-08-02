const express = require('express')
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

app.listen(PORT, () => console.log('app listening on port ', PORT))