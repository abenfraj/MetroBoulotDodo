const express = require('express');

const cors = require('cors')
const bodyParser = require('body-parser')

const { readSommets } = require('./helpers/sommets.js');
const { readArcs } = require('./helpers/arcs.js');

const app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cors()) //to allow cross-origin requests

//Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server listening')
})

app.get('/sommets', readSommets);

app.get('/arcs', readArcs);
