const express = require('express')
const route = require('./routes/route')
const mongoose = require('mongoose')
const multer = require('multer')

const app = express()

app.use(multer().any())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', route)

mongoose.connect("mongodb+srv://Bhagaban:L2vSe5ZRZjoVfhOA@cluster0.ojbuh.mongodb.net/cybertize", { useNewUrlParser: true })
    .then(() => console.log('MongoDB is connected!!'))
    .catch(err => console.log(err))


app.listen(process.env.PORT || 3000, function () {
    console.log('Sever Connected at : ' + (process.env.PORT || 3000))
});