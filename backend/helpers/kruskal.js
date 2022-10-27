const { parcoursProfondeur } = require("./connexe");
const { Graphe } = require("./graphe");

const find = (parent, i) => {
    if (parent[i] == i) {
        return i;
    }
    return find(parent, parent[i]);
};

const union = (parent, rank, x, y) => {
    const xroot = find(parent, x);
    const yroot = find(parent, y);
    if (rank[xroot] < rank[yroot]) {
        parent[xroot] = yroot;
    }
    else if (rank[xroot] > rank[yroot]) {
        parent[yroot] = xroot;
    }
    else {
        parent[yroot] = xroot;
        rank[xroot] += 1;
    }
};

const kruskal = (graphe) => {
    const sommets = graphe.sommets;
    const arcs = graphe.arcs;
    const arbre = [];
    let i = 0;
    let e = 0;
    arcs.sort((a, b) => a.tempsEnSecondes - b.tempsEnSecondes);
    const parent = [];
    const rank = [];
    for (i = 0; i < sommets.length; i++) {
        parent[i] = i;
        rank[i] = 0;
    }
    i = 0;
    while (e < sommets.length - 1) {
        const arc = arcs[i++];
        const x = find(parent, arc.numSommet1);
        const y = find(parent, arc.numSommet2);
        if (x != y) {
            e++;
            arbre.push(arc);
            union(parent, rank, x, y);
        }
    }
    let cpt = 0;
    for (let i = 0; i < arbre.length; i++) {
        cpt += arbre[i].tempsEnSecondes;
    }
    console.log("Temps total de l'arbre: " + cpt);
    return arbre;
};

module.exports = {
    kruskal,
};