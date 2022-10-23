// const trouverMin = (distances, sommetsATraiter) => {
//   let min = Number.MAX_SAFE_INTEGER;
//   let sommetTrouve;
//   sommetsATraiter.forEach((sommet) => {
//     if (distances[sommet.numSommet] < min) {
//       min = distances[sommet.numSommet];
//       sommetTrouve = sommet;
//     }
//   });
//   return sommetTrouve;
// };

// const dijkstra = (graph, source) => {
//   const distances = new Array(graph.sommets.length);
//   const sommetsATraiter = new Array();
//   const predecesseurs = new Array(graph.sommets.length);
//   graph.sommets.forEach((sommet) => {
//     distances[sommet.numSommet] = Number.MAX_SAFE_INTEGER;
//     predecesseurs[sommet.numSommet] = { sommet1: sommet, sommet2: null };
//     sommetsATraiter.push(sommet);
//   });
//   distances[source] = 0;

//   while (sommetsATraiter.length > 0) {
//     const sommet = trouverMin(distances, sommetsATraiter);
//     const index = sommetsATraiter.indexOf(sommet);
//     sommetsATraiter.splice(index, 1);
//     graph.sommets[index].successeurs.forEach((voisin) => {
//       const distance = graph.getDistance(index, voisin);
//       if (distance + distances[index] < distances[voisin]) {
//         distances[voisin] = distance + distances[index];
//         predecesseurs[voisin] = { sommet1: sommet, sommet2: voisin };
//       }
//     });
//   }
//   console.log("distances :", distances);
//   console.log("precedent :", precedent);
// };

const dijkstra = (graph, source, arrivee) => {
  const distances = new Array(graph.sommets.length);
  distances.fill(Number.MAX_SAFE_INTEGER);
  const sommetsVisites = new Array(graph.sommets.length);
  sommetsVisites.fill(false);
  let predecesseurs = new Array(graph.sommets.length);
  predecesseurs.fill(null);
  distances[source] = 0;
  let sommetActuel = source;
  while (sommetActuel != arrivee) {
    sommetsVisites[sommetActuel] = true;
    graph.sommets[sommetActuel].successeurs.forEach((voisin) => {
      const distance = graph.getDistance(sommetActuel, voisin);
      if (distance + distances[sommetActuel] < distances[voisin]) {
        distances[voisin] = distance + distances[sommetActuel];
        predecesseurs[voisin] = sommetActuel;
      }
    });
    let min = Number.MAX_SAFE_INTEGER;
    graph.sommets.forEach((index) => {
      if (!sommetsVisites[index] && distances[index] < min) {
        min = distances[index];
        sommetActuel = index;
      }
    });
  }
  const plusCourtChemin = [];
  let sommet = arrivee;
  while (sommet != source) {
    plusCourtChemin.push(sommet);
    sommet = predecesseurs[sommet];
  }
  plusCourtChemin.reverse();
  console.log("plusCourtChemin :", plusCourtChemin);
};

module.exports = {
  dijkstra,
};
