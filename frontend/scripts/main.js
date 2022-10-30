window.onload = function () {
  afficherStations();
  localStorage.clear();
  setSelectsStations();
};

function setSelectsStations() {
  var options = "";
  $.ajax({
    url: "http://localhost:3000/sommets",
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
      const uniqueData = data.filter(
        (v, i, a) => a.findIndex((t) => t.nomSommet === v.nomSommet) === i
      );
      for (var i = 0; i < uniqueData.length; i++) {
        options +=
          "<option value='" +
          uniqueData[i].numSommet +
          "'>" +
          uniqueData[i].nomSommet +
          "</option>";
      }
    },
  });
  document.getElementById("station_Depart").innerHTML = options;
  document.getElementById("station_Arrivee").innerHTML = options;
}

function tracerPoint(x, y, numSommet) {
  const svgw3 = "http://www.w3.org/2000/svg";
  const metro = document.getElementById("svg_map");

  let circle = document.createElementNS(svgw3, "circle");

  circle.setAttributeNS(null, "cx", x);
  circle.setAttributeNS(null, "cy", y);
  circle.setAttributeNS(null, "r", 4.5);
  circle.setAttributeNS(
    null,
    "style",
    "fill: white; stroke: black; stroke-width: 2px;"
  );
  circle.setAttributeNS(null, "cursor", "pointer");
  circle.setAttributeNS(null, "id", numSommet);
  circle.setAttributeNS(null, "class", "station");

  metro.appendChild(circle);
}

function tracerStationActuelle(x, y) {
  const svgw3 = "http://www.w3.org/2000/svg";
  const metro = document.getElementById("svg_map");

  let circle = document.createElementNS(svgw3, "circle");

  circle.setAttributeNS(null, "cx", x);
  circle.setAttributeNS(null, "cy", y);
  circle.setAttributeNS(null, "r", 6);
  circle.setAttributeNS(
    null,
    "style",
    "fill: brown; stroke: black; stroke-width: 3px;"
  );
  circle.setAttributeNS(null, "cursor", "pointer");
  circle.setAttributeNS(null, "id", "stationActuelle");

  metro.appendChild(circle);
}

function tracerLigne(x1, y1, x2, y2) {
  const svgw3 = "http://www.w3.org/2000/svg";
  const metro = document.getElementById("svg_map");

  let line = document.createElementNS(svgw3, "line");

  line.setAttributeNS(null, "x1", x1);
  line.setAttributeNS(null, "y1", y1);
  line.setAttributeNS(null, "x2", x2);
  line.setAttributeNS(null, "y2", y2);
  line.setAttributeNS(null, "stroke", "black");
  line.setAttributeNS(null, "stroke-width", "3px");
  line.setAttributeNS(null, "class", "ligne");

  metro.appendChild(line);
}

function afficherStations() {
  var positions;
  $.ajax({
    url: "http://localhost:3000/sommets",
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        positions = getPosition_NomSommet(data[i].nomSommet);
        tracerPoint(positions[0], positions[1], data[i].numSommet);
      }
    },
  });
}

function effacerLignesActuelles() {
  const lines = document.querySelectorAll(".ligne");
  const metro = document.getElementById("svg_map");
  lines.forEach((element) => {
    metro.removeChild(element);
  });
  if (document.getElementById("stationActuelle") != null) {
    document.getElementById("stationActuelle").remove();
  }
}

$(document).ready(function () {
  $(".station").click(function () {
    if (localStorage.getItem("depart") === null) {
      effacerLignesActuelles();
      console.log("Station de départ: " + this.id);
      localStorage.setItem("depart", this.id);
      tracerStationActuelle(this.getAttribute("cx"), this.getAttribute("cy"));
    } else {
      console.log("Station d'arrivée: " + this.id);
      effacerLignesActuelles();
      afficherItineraire(localStorage.getItem("depart"), this.id);
      localStorage.removeItem("depart");
    }
  });
});

function trouverItineraire() {
  var depart = document.getElementById("station_Depart").value;
  var arrivee = document.getElementById("station_Arrivee").value;
  afficherItineraire(depart, arrivee);
}

function afficherItineraire(numDepart, numArrivee) {
  effacerLignesActuelles();
  $.ajax({
    url: "http://localhost:3000/dijkstra/" + numDepart + "/" + numArrivee,
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
      for (var i = 0; i < data.length - 1; i++) {
        positions1 = getPosition_NomSommet(getNomSommet_NumSommet(data[i]));
        positions2 = getPosition_NomSommet(getNomSommet_NumSommet(data[i + 1]));
        tracerLigne(positions1[0], positions1[1], positions2[0], positions2[1]);
      }
      detailsItineraire(data);
    },
  });
}

function detailsItineraire(data) {
  var details = "";
  for (var i = 1; i < data.length; i++) {
    details +=
      "<p>" +
      getNomSommet_NumSommet(data[i - 1]) +
      " (" +
      getLigne_NumSommet(data[i - 1]) +
      ") → " +
      getNomSommet_NumSommet(data[i]) +
      " (" +
      getLigne_NumSommet(data[i]) +
      ") : " +
      convertirTemps(getDistance_Arc(data[i - 1], data[i])) +
      "</p>";
  }
  const distanceTotale = convertirTemps(getDistanceTotale(data));
  details += "</br><p>Temps total : " + distanceTotale + "</p>";
  document.getElementById("detailsItineraire").innerHTML = details;
}

function getDistanceTotale(data) {
  var distanceTotale = 0;
  for (var i = 1; i < data.length; i++) {
    distanceTotale += getDistance_Arc(data[i - 1], data[i]);
  }
  return distanceTotale;
}

function getLigne_NumSommet(numSommet) {
  var ligne;
  $.ajax({
    url: "http://localhost:3000/sommets/" + numSommet,
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
      ligne = data.numeroLigne;
    },
  });
  return ligne;
}

function getDistance_Arc(numSommet1, numSommet2) {
  var distance;
  $.ajax({
    url: "http://localhost:3000/arcs/" + numSommet1 + "/" + numSommet2,
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
      distance = data.tempsEnSecondes;
    },
  });
  if(distance == null){
    $.ajax({
      url: "http://localhost:3000/arcs/" + numSommet2 + "/" + numSommet1,
      dataType: "json",
      type: "GET",
      async: false,
      success: function (data) {
        distance = data.tempsEnSecondes;
      },
    });
  }
  return distance;
}

function convertirTemps(temps) {
  var heures = Math.floor(temps / 3600);
  var minutes = Math.floor((temps - heures * 3600) / 60);
  var secondes = temps - heures * 3600 - minutes * 60;
  if(heures == 0)
    return minutes + "m " + secondes + "s";
  return heures + "h " + minutes + "m " + secondes + "s";
}

function afficherACPM() {
  effacerLignesActuelles();
  let successData = [];
  let positions1, positions2;
  let cpt = 0;
  $.ajax({
    url: "http://localhost:3000/kruskal",
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
      successData = data;
    },
  });
  for (var i = 0; i < successData.length; i++) {
    cpt += successData[i].tempsEnSecondes;
    positions1 = getPosition_NomSommet(
      getNomSommet_NumSommet(successData[i].numSommet1)
    );
    positions2 = getPosition_NomSommet(
      getNomSommet_NumSommet(successData[i].numSommet2)
    );
    tracerLigne(positions1[0], positions1[1], positions2[0], positions2[1]);
  }
  document.getElementById("temps-en-secondes").innerHTML =
    "Temps total de l'ACPM : " + cpt + " secondes";
}

function getNomSommet_NumSommet(numSommet) {
  var nomSommet;
  $.ajax({
    url: "http://localhost:3000/sommets",
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].numSommet == numSommet) {
          return (nomSommet = data[i].nomSommet);
          break;
        }
      }
    },
  });
  return nomSommet;
}

function getPosition_NomSommet(nomSommet) {
  var x, y;
  nomSommet = nomSommet.replaceAll(" ", "@");
  $.ajax({
    url: "http://localhost:3000/positions",
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].nomSommet == nomSommet) {
          x = data[i].x;
          y = data[i].y;
          break;
        }
      }
    },
  });
  return [x, y];
}
