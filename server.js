const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;  // gets the port from the bound environment variable, if it exists

const path = require('path');           // this allows the join() method used to concat filepaths in the routes
const fs = require("fs").promises;      // cofigs methods to return promises instead of callbacks

var uniqid = require('uniqid');         // generates unique keys

// reads saved notes from db.json
// returns array of objects representing saved notes
async function readFile() {
    const data = await fs.readFile("./db/db.json", "utf8");
    return JSON.parse(data);
}

// saves notes to db.json
async function writeFile(data) {
    data = JSON.stringify(data);
    await fs.writeFile("./db/db.json", data);
}

// Routes

// return homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// return note page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// returns all notes saved in the db
app.get('/api/notes', async(req, res) => {
    let data = await readFile();
    res.json(data);
});
  
// adds a new note to db.json
app.post('/api/notes', async (req, res) => {

    const newNote = req.body;     // get data from client
    let notes = await readFile(); // get notes array from db

    newNote.id = uniqid();        // give new note a unique id
    notes.push(newNote);          // save new note to array

    await writeFile(notes);       // write notes array to file

    res.json(newNote);            // send back new note (update front end)

});

// deletes a note from db.json and sends updated data to client
app.delete('/api/notes/:id', async (req, res) => {

    let savedNotes = await readFile(); // get notes array from db
    let clientID = req.params.id;      // get note id from client

    // iterate over saved items
    for (let i = 0; i < savedNotes.length; i++) {

        // if the saved note's id matches the one sent by client, remove it
        if (savedNotes[i].id === clientID) {
            savedNotes.splice(i,1); 
        }
    }
    await writeFile(savedNotes);       // write modified array to file
    res.json(savedNotes);              // respond with updated data
});

// listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
