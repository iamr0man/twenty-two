// const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const morgan = require('morgan')

// Init dotenv package
dotenv.config({ path: './config/config.env' })

// Connect to DB
connectDB();

const app = express();

// Url and json parse
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Development logging
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/', require('./routes/user'))
app.use('/tasks', require('./routes/tasks'))
// app.use('/passion', require('./routes/passion'))
// app.use('/language', require('./routes/language'))

const PORT = process.env.PORT || 3003
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
