const events = require("events");
const fs = require("fs");
const readline = require("readline");

const { Sommet } = require('./sommets')
const { Arc } = require('./arcs')

const readSommets = async () => {
  const sommets = [];
  let sommet = new Sommet();

  try {
    const rl = readline.createInterface({
      input: fs.createReadStream("../utils/metro.txt"),
      crlfDelay: Infinity,
    });
    rl.on("line", (line) => {
      if (line[0] == "V") {
        sommet = new Sommet();
        split = line.split(";");
        sommet.numSommet = parseInt(split[0].substring(2, 6));
        sommet.nomSommet = split[0].substring(7, split[0].length - 1);
        sommet.numeroLigne = parseInt(split[1].substring(0, split[1].length - 1));
        sommet.siTerminus = split[2].split(" ")[0] == "true" ? true : false;
        sommet.branchement = parseInt(split[2].split(" ")[1]);
        sommets.push(sommet);
      }
    });
    await events.once(rl, "close");
    return sommets;
  } catch (err) {
    console.error(err);
  }
};

const readArcs = async () => {
  const arcs = [];
  let arc = new Arc();

  try {
    const rl = readline.createInterface({
      input: fs.createReadStream("../utils/metro.txt"),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      if (line[0] == "E") {
        split = line.split(" ");
        arc = new Arc();
        arc.numSommet1 = parseInt(split[1]);
        arc.numSommet2 = parseInt(split[2]);
        arc.tempsEnSecondes = parseInt(split[3]);
        arcs.push(arc);
      }
    });
    await events.once(rl, "close");
    return arcs;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { readSommets, readArcs };