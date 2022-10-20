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
        });
    }

    getSommet(numSommet) {
        return this.sommets[numSommet];
    }
};

module.exports = {
  Graphe,
};
