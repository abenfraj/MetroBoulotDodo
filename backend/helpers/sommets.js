class Sommet {
  constructor(
    numSommet,
    nomSommet,
    numeroLigne,
    siTerminus,
    branchement,
    successeurs,
    visite
  ) {
    this.numSommet = numSommet;
    this.nomSommet = nomSommet;
    this.numeroLigne = numeroLigne;
    this.siTerminus = siTerminus;
    this.branchement = branchement;
    this.successeurs = [];
    this.visite = false;
  }
}

module.exports = {
  Sommet,
};