const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

const path = require('path');      // this allows the join() method used to concat filepaths in the routes
const fs = require("fs").promises; // returns promises instead of callbacks

async function readFile() {

    const data = await fs.readFile("./db/db.json", "utf8");
    return JSON.parse(data);

}

// TODO: data must be array of objects
async function writeFile(data) {

    data = JSON.stringify(data);
    await fs.writeFile("./db/db.json", data);

}

// Routes

// return homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// return note page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', async(req, res) => {
    console.log("GET");
    let data = await readFile();
    res.json(data);
});
  
// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {

    // save the new note
    console.log("POST REQUEST");
    // const newNote = req.body;
    // res.json(newNote);
    // get the 

});

// BONUS
// You haven’t learned how to handle DELETE requests, but this application has that functionality in the front end. 
// As a bonus, see if you can add the DELETE route to the application using the following guideline:

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. 

// In order to delete a note, you'll need to read all notes from the db.json file, 
// remove the note with the given id property, 
// and then rewrite the notes to the db.json file.

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));