const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const { Graphe } = require('./helpers/graphe.js')
const { readSommets } = require('./helpers/data-extractor')
const { readArcs } = require('./helpers/data-extractor')
const { parcoursProfondeur } = require('./helpers/connexe')
const { initDijkstra, dijkstra, dijkstraTest } = require('./helpers/dijkstra')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server listening')
})

readSommets().then((sommets) => {
    readArcs().then((arcs) => {
        const graphe = new Graphe(sommets, arcs);
        parcoursProfondeur(graphe);
        dijkstra(graphe, 268, 24);
        app.get('/sommets', (req, res) => {
            res.send(sommets);
        })
        app.get('/arcs', (req, res) => {
            res.send(arcs);
        })
        app.get('/graphe', (req, res) => {
            res.send(graphe);
        })
    })
})