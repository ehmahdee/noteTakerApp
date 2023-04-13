//Requirements
const express = require('express');
const path = require("path")
const fs = require("fs")
const util = require("util")

//Async
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

//establishing Server
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended:true }))
app.use(express.json())

//Static Middleware
app.use(express.static("./Develop/public"))

//GET

//POST

//DELETE

//HTML routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
})

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
})

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
})

app.listen(PORT, function() {
    console.log(`app listening at: http://localhost:${PORT}`)
})