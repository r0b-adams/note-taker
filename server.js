const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const path = require('path'); // this allows the join() method used to concat filepaths in the routes


// Routes

// return homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// return note page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));