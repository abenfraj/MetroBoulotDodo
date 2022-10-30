const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Graphe } = require("./helpers/graphe.js");
const { readSommets } = require("./helpers/data-extractor");
const { readArcs } = require("./helpers/data-extractor");
const { readPositions } = require("./helpers/data-extractor");
const { parcoursProfondeur } = require("./helpers/connexe");
const { dijkstra } = require("./helpers/dijkstra");
const { kruskal } = require("./helpers/kruskal.js");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server listening");
});

readSommets().then((sommets) => {
  readArcs().then((arcs) => {
    const graphe = new Graphe(sommets, arcs);
    parcoursProfondeur(graphe);
    app.get("/sommets", (req, res) => {
      res.send(sommets);
    });
    app.get("/arcs", (req, res) => {
      res.send(arcs);
    });
    app.get("/graphe", (req, res) => {
      res.send(graphe);
    });
    app.get("/dijkstra/:source/:arrivee", (req, res) => {
      const source = req.params.source;
      const arrivee = req.params.arrivee;
      let chemin = dijkstra(graphe, source, arrivee);
      res.json(chemin);
    });
    app.get("/connexe", (req, res) => {
      const connexe = parcoursProfondeur(graphe);
      res.send(connexe);
    });
    app.get("/kruskal", (req, res) => {
      const arbre = kruskal(graphe);
      res.send(arbre);
    });
    app.get("/sommets/ligne/:ligne", (req, res) => {
      const ligne = req.params.ligne;
      const sommetsLigne = sommets.filter(
        (sommet) => sommet.numeroLigne == ligne
      );
      res.send(sommetsLigne);
    });
    app.get("/sommets/:id", (req, res) => {
      const id = req.params.id;
      const sommet = sommets.find((sommet) => sommet.numSommet == id);
      res.send(sommet);
    });
    app.get("/arcs/:numSommet1/:numSommet2", (req, res) => {
      const numSommet1 = req.params.numSommet1;
      const numSommet2 = req.params.numSommet2;
      const arc = arcs.find(
        (arc) => arc.numSommet1 == numSommet1 && arc.numSommet2 == numSommet2
      );
      res.send(arc);
    });
  });
});

readPositions().then((positions) => {
  app.get("/positions", (req, res) => {
    res.send(positions);
  });
});
