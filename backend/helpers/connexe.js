const { getSommet } = require('./graphe');

const explorer = (graphe, sommet) => {
    sommet.visite = true;
    if(sommet.successeurs != null) {
        sommet.successeurs.forEach((successeur) => {
            graphe.getSommet(successeur);
            explorer(graphe, successeur);
        });
    }
}

const parcoursProfondeur = (graphe) => {
    graphe.sommets.forEach((sommet) => {
        sommet.visite = false;
    });
    graphe.sommets.forEach((sommet) => {
        if (!sommet.visite) {
            explorer(graphe, sommet);
        }
    });
    if(graphe.sommets.every((sommet) => sommet.visite)) {
        console.log("Le graphe est connexe");
        return true;
    } else {
        console.log("Le graphe n'est pas connexe");
        return false;
    }
}

module.exports = {
    parcoursProfondeur,
};