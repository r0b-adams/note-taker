const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

const path = require('path');      // this allows the join() method used to concat filepaths in the routes
const fs = require("fs").promises; // returns promises instead of callbacks

var uniqid = require('uniqid');    // generates unique keys

async function readFile() {

    const data = await fs.readFile("./db/db.json", "utf8");
    return JSON.parse(data);

}

async function writeFile(data) {

    data = JSON.stringify(data);
    await fs.writeFile("./db/db.json", data);

}

// Pages

// return homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// return note page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// APIs

// returns all notes saved in the db
app.get('/api/notes', async(req, res) => {
    let data = await readFile();
    res.json(data);
});
  
// receives a new note 
// adds it to the db.json file
// then returns the new note to the client. 
app.post('/api/notes', async (req, res) => {
    const newNote = req.body;     // from client
    let notes = await readFile(); // get notes array from db

    newNote.id = uniqid();        // give new note a unique id
    notes.push(newNote);          // save new note to array

    await writeFile(notes);       // write notes array to file

    res.json(newNote);            // send back new note (update front end)

});

// BONUS
// You haven’t learned how to handle DELETE requests, but this application has that functionality in the front end. 
// As a bonus, see if you can add the DELETE route to the application using the following guideline:

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. 

// In order to delete a note, you'll need to read all notes from the db.json file, 
// remove the note with the given id property, 
// and then rewrite the notes to the db.json file.

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));