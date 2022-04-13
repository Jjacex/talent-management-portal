const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const path = require('path')
const connectDB = require('./config/db')
const session = require('express-session')
const passport = require('passport')
const authUser = require('./middleware/authUser')
const User = require('./models/userModel')
const errorHandler = require('./middleware/errorMiddleware')

connectDB()
authUser()

const app = express()
app.set('view engine', 'ejs')

app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/user', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})