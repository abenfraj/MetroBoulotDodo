class Graphe {
  constructor(sommets, arcs) {
    this.sommets = sommets;
    this.arcs = arcs;
    this.setSuccesseurs();
  }

  setSuccesseurs() {
    this.sommets.forEach((sommet) => {
      sommet.successeurs = [];
    });
    this.arcs.forEach((arc) => {
      this.sommets[arc.numSommet1].successeurs.push(arc.numSommet2);
      this.sommets[arc.numSommet2].successeurs.push(arc.numSommet1);
    });
  }

  getSommet(numSommet) {
    return this.sommets[numSommet];
  }

  getDistance(numSommet1, numSommet2) {
    let distance = 0;
    this.arcs.forEach((arc) => {
      if (
        (arc.numSommet1 == numSommet1 && arc.numSommet2 == numSommet2) ||
        (arc.numSommet1 == numSommet2 && arc.numSommet2 == numSommet1)
      ) {
        distance = arc.tempsEnSecondes;
      }
    });
    return distance;
  }
}

module.exports = {
  Graphe,
};
