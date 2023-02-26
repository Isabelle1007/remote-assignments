const express = require('express');

const app = express(); // returns an express application

app.get('/', (req, res) => { // parameter: path, callback
    res.send('<h2>Hi, welcome to the root page</h2>');
});

app.get('/healthcheck', (req, res) => { 
    res.send('This is the first API named healthcheck');
});

// set up a development server listening on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
});

