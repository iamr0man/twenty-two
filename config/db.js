const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://iamr0man:danit0@cluster0-51kl1.mongodb.net/twenty-two?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false 
        })
        console.log('Mongo Connected')
    } catch(err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB;