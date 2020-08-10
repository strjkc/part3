const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)


const url = process.env.DB_URL

console.log('url',url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)