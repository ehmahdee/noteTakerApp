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


app.use(express.urlencoded({ extended:true }))
app.use(express.json())

//Static Middleware
app.use(express.static("./Develop/public"))

//GET
app.get("/api/notes", (req, res) => {
    readFileAsync("./Develop/db/db.json", "utf8")
    .then(data => {
        notes = [].concat(JSON.parse(data))
    })
})

//POST
app.post("/api/notes", (req, res) => {
    const note = req.body
    readFileAsync("./Develop/db/db.json", "utf8")
    .then(data => {
        const notes = [].concat(JSON.parse(data))
        note.id = notes.length + 1
        notes.push(note)
        return notes
    }) .then(notes => {
        writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
        res.json(notes)
    })
})

//DELETE
app.delete("/api/notes:id", (req, res) => {
    const idToDelete = parseInt(req.params.id)
    readFileAsync("./Develop/db/db.json", "utf8")
    .then(data => {
        const notes = [].concat(JSON.parse(data))
        const newNotesData = []
        for (let i = 0; i < notes.length; i++) {
            if(idToDelete !== notes[i].id) {
                newNotesData.push(notes[i])
            }
        }
        return newNotesData
    })
    .then(notes => {
        writeFileAsync("./Develop/db/db.json", JSON.stringify(notes))
        res.send("saved successfully!")
    })
})


//HTML routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
})
    

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`app listening at: http://localhost:${PORT}`)
})