const { sommets } = require("../data/sommets.json");
const events = require("events");
const fs = require("fs");
const readline = require("readline");

const readSommets = async () => {
  const sommets = [];

  let sommet,
    split,
    num_sommet,
    nom_sommet,
    numero_ligne,
    si_terminus,
    branchement;

  try {
    const rl = readline.createInterface({
      input: fs.createReadStream("../utils/metro.txt"),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      if (line[0] == "V") {
        split = line.split(";");
        num_sommet = split[0].substring(2, 6);
        nom_sommet = split[0].substring(7, split[0].length - 1);
        numero_ligne = split[1].substring(0, split[1].length - 1);
        si_terminus = split[2].split(" ")[0];
        branchement = split[2].split(" ")[1];
        sommet = {
          num_sommet: num_sommet,
          nom_sommet: nom_sommet,
          numero_ligne: numero_ligne,
          si_terminus: si_terminus,
          branchement: branchement,
        };
        sommets.push(sommet);
      }
    });    
    await events.once(rl, "close");
    fs.writeFile(
      "./data/sommets.json",
      JSON.stringify({ sommets: [sommets] }),
      (err) => {
        if (err) throw err;
      }
    );
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  readSommets,
};
