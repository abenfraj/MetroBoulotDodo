const { parcoursProfondeur } = require("./connexe");
const { Graphe } = require("./graphe");

const kruskal = (graphe) => {
    const arcs = graphe.arcs;
    const arbre = new Graphe([], []);
    const arbreSommets = new Array();
    const arbreArcs = new Array();
    arcs.sort((a, b) => a.tempsEnSecondes - b.tempsEnSecondes);
    arcs.forEach(arc => {
        if (!arbreSommets.includes(arc.numSommet1)) {
            arbreSommets.push(arc.numSommet1);
        }
        if (!arbreSommets.includes(arc.numSommet2)) {
            arbreSommets.push(arc.numSommet2);
        }
        if (arbreSommets.includes(arc.numSommet1) && arbreSommets.includes(arc.numSommet2)) {
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

// Kruskal(G) :
// 1   A := ø
// 2   pour chaque sommet v de G :
// 3      créerEnsemble(v)
// 4   trier les arêtes de G par poids croissant
// 5   pour chaque arête (u, v) de G prise par poids croissant :
// 6      si find(u) ≠ find(v) :
// 7         ajouter l'arête (u, v) à l'ensemble A
// 8         union(u, v)
// 9   renvoyer A


// algorithm Kruskal(G) is
//     F:= ∅
//     for each v ∈ G.V do
//         MAKE-SET(v)
//     for each (u, v) in G.E ordered by weight(u, v), increasing do
//         if FIND-SET(u) ≠ FIND-SET(v) then
//             F:= F ∪ {(u, v)} ∪ {(v, u)}
//             UNION(FIND-SET(u), FIND-SET(v))
//     return F