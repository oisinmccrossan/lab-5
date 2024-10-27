const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse URL-encoded bodies (for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle the root URL
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Route to handle dynamic URL with name and surname parameters
app.get('/hello/:name/:surname', (req, res) => {
    const name = req.params.name;
    const surname = req.params.surname;
    res.send(`Hello ${name} ${surname}`);
});

// Route to handle API request for movies
app.get('/api/movies', (req, res) => {
    const myMovies = [
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://example.com/poster1.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://example.com/poster2.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://example.com/poster3.jpg"
        }
    ];
    res.status(201).json({ myMovies });
});

// Route to serve the index.html file
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle GET request for /name with query parameters
app.get('/name', (req, res) => {
    const firstname = req.query.firstname;
    const lastname = req.query.lastname;
    res.send(`Hello ${firstname} ${lastname}`);
});

// Route to handle POST request for /name with form data
app.post('/name', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    res.send(`Hello ${firstname} ${lastname}`);
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});