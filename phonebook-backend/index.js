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

app.get('/info', (request, response) => {
  Person.find({})
  .then(DBresponse => response.send(`Phonebook has info for ${DBresponse.length} people
  <br><br>
  ${Date()}`) )
  })

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then( DBresponse => DBresponse 
          ? response.json(DBresponse)
          : response.status(404).end()
  ).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(DBresponse => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const data = request.body
  if (!data.name || !data.number)
    response.status(400).json({error: 'content missing'})
  else {
    const newPerson = new Person({...data})
    newPerson.save()
      .then( DBresponse => {
        console.log('Database Response: ', DBresponse)
        response.json(DBresponse)}
      ).catch(error => next(error))
  }
})

app.put('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, {...request.body}, {new: true})
  .then(DBresponse => {
    console.log('DBres:',DBresponse)
    response.json(DBresponse)})
  .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError')
    return res.status(400).send({error: 'malformed id'})
  next(error)
}
app.use(errorHandler)

app.listen(PORT, () => console.log('app listening on port ', PORT))