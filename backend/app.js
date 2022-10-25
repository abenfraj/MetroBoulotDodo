const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')

const { Graphe } = require('./helpers/graphe.js')
const { readSommets } = require('./helpers/data-extractor')
const { readArcs } = require('./helpers/data-extractor')
const { readPositions } = require('./helpers/data-extractor')
const { parcoursProfondeur } = require('./helpers/connexe')
const { dijkstra } = require('./helpers/dijkstra');
const { kruskal } = require('./helpers/kruskal.js');

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
        kruskal(graphe);
        app.get('/  ', (req, res) => {
            res.send(sommets);
        })
        app.get('/arcs', (req, res) => {
            res.send(arcs);
        })
        app.get('/graphe', (req, res) => {
            res.send(graphe);
        })
        app.get('/dijkstra/:source/:arrivee', (req, res) => {
            const source = req.params.source;
            const arrivee = req.params.arrivee;
            let chemin = dijkstra(graphe, source, arrivee);
            res.json(chemin);
        })
        app.get('/connexe', (req, res) => {
            const connexe = parcoursProfondeur(graphe);
            res.send(connexe);
        })
        app.get('/kruskal', (req, res) => {
            const arbre = kruskal(graphe);
            res.send(arbre);
        })
    })
})

readPositions().then((positions) => {
    app.get('/positions', (req, res) => {
        res.send(positions)
    })
})