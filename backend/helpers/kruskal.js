const { Graphe } = require("./graphe");

const kruskal = (graphe) => {
    const arcs = graphe.arcs;
    const sommets = graphe.sommets;
    const arbre = new Graphe([], []);
    const arbreSommets = new Array();
    const arbreArcs = new Array();
    arcs.sort((a, b) => a.poids - b.poids);
    arcs.forEach(arc => {
        if (!arbreSommets.includes(arc.sommet1)) {
            arbreSommets.push(arc.sommet1);
        }
        if (!arbreSommets.includes(arc.sommet2)) {
            arbreSommets.push(arc.sommet2);
        }
        if (arbreSommets.includes(arc.sommet1) && arbreSommets.includes(arc.sommet2)) {
            arbreArcs.push(arc);
        }
    });
    arbre.sommets = arbreSommets;
    arbre.arcs = arbreArcs;
    let cpt = 0;
    arbre.arcs.forEach(arc => {
        cpt += arc.tempsEnSecondes;
    });
    console.log("poids total :", cpt);
    return arbre;
}

module.exports = {
    kruskal,
};