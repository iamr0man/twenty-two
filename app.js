// const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const morgan = require('morgan')

// Init dotenv package
dotenv.config({ path: './config/config.env' })

// Connect to DB
connectDB();

const app = express();

//Init Middleware
app.use(cors())
// Url and json parse
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Development logging
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/', require('./routes/user'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/category', require('./routes/category'))

const PORT = process.env.PORT || 3003
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))
