const { arcs } = require("../data/arcs.json");
const events = require("events");
const fs = require("fs");
const readline = require("readline");

const readArcs = async () => {
  const arcs = [];

  let arc, num_sommet1, num_sommet2, temps_en_secondes;

  try {
    const rl = readline.createInterface({
      input: fs.createReadStream("../utils/metro.txt"),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      if (line[0] == "E") {
        split = line.split(" ");
        num_sommet1 = split[1];
        num_sommet2 = split[2];
        temps_en_secondes = split[3];
        arc = {
          num_sommet1: num_sommet1,
          num_sommet2: num_sommet2,
          temps_en_secondes: temps_en_secondes,
        };
        arcs.push(arc);
      }
    });

    await events.once(rl, "close");
    fs.writeFile(
      "./data/arcs.json",
      JSON.stringify({ arcs: [arcs] }),
      (err) => {
        if (err) throw err;
      }
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  readArcs,
};
