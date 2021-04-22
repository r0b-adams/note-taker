const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const path = require('path'); // this allows the join() method used to concat filepaths in the routes

const fs = require("fs");
const util = require('util');

const readFileProm = util.promisify(fs.readFile);
const writeFileProm = util.promisify(fs.writeFile);

// works
function readFile() {

    readFileProm("./db/db.json", "utf8").then(data=>console.log(data)).catch(err=>console.log(err));

}

readFile();











// Routes

// return homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// return note page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    // MY CODE HERE
    // console.log(req.body);
    console.log("GET REQUEST");
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