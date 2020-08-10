const mongoose = require('mongoose')

if (process.argv.length < 2)
{
    console.error('\narguments missing,\nenter a valid password and a person to add \n')
    process.exit(1)
}
console.log(`ONE ${process.argv[1]}, TWO ${process.argv[2]}, THREE ${process.argv[3]}`)
const password = process.argv[2]

const url = `mongodb+srv://strahinja:${password}@cluster0.acck5.mongodb.net/PHONEBOOK-EXERCISE-DB?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Person', contactSchema)
console.log('arglen', process.argv.length )
if (process.argv[3])
{
    const newContact = new Contact({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    newContact.save()
        .then(response => {console.log(response, 'saved')
            mongoose.connection.close()})
} else {
    console.log('\nphonebook:')
    Contact.find({})
        .then(response => { response.forEach(contact => console.log(`${contact.name} ${contact.number}`))
            mongoose.connection.close()
    })
}
