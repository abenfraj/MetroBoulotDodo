window.onload = function () {
  const canvas = document.getElementById("map");
  const context = canvas.getContext("2d");
  const img = new Image();
  img.src = "../utils/metrof_r.png"; 
  img.onload = () => {
    context.drawImage(img, 0, 0);
    tracerStations();
  };
};

function tracerPoint(x, y) {
  const canvas = document.getElementById("map");
  const context = canvas.getContext("2d");
  context.lineWidth = 1.5;
  context.strokeStyle = 'black';
  context.fillStyle = 'white';

  context.beginPath();
  context.arc(x, y, 4.5, 0, 2 * Math.PI);
  context.fill();
  context.stroke();
}

function tracerLigne(x1, y1, x2, y2) {
  const canvas = document.getElementById("map");
  const context = canvas.getContext("2d");
  context.strokeStyle = 'black';
  context.lineWidth = 3;

  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

function tracerStations() {
  var positions;
  $.ajax({
    url: "http://localhost:3000/sommets",
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
      for (var i = 0; i < data.length; i++){
          positions = getPosition_NomSommet(data[i].nomSommet);
          tracerPoint(positions[0], positions[1]);
      }      
    },
  });
}

function afficherACPM() {
  var positions1, positions2;
  console.log("afficherACPM");
  $.ajax({
    url: "http://localhost:3000/kruskal",
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
      for (var i = 0; i < data.length; i++){
          positions1 = getPosition_NomSommet(getNomSommet_NumSommet(data[i].numSommet1));
          positions2 = getPosition_NomSommet(getNomSommet_NumSommet(data[i].numSommet2));
          tracerLigne(positions1[0], positions1[1], positions2[0], positions2[1]);
      }      
    },
  });
}

function trouverItineraire(depart, arrivee) {
  const canvas = document.getElementById("map");
  const context = canvas.getContext("2d");
  var positions;
  $.ajax({
    url: "http://localhost:3000/dijkstra/" + depart + "/" + arrivee,
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
      for (var i = 0; i < data.length; i++){
        positions = getPosition_NomSommet(getNomSommet_NumSommet(data[i]));
        tracerPoint(positions[0], positions[1]);
      }
    },
  });
}

function getNomSommet_NumSommet(numSommet) {
  var nomSommet;
  $.ajax({
    url: "http://localhost:3000/sommets",
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
      for (var i = 0; i < data.length; i++){
        if(data[i].numSommet == numSommet) {
          return nomSommet = data[i].nomSommet;
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
      for (var i = 0; i < data.length; i++){
        if(data[i].nomSommet == nomSommet) {
          x = data[i].x;
          y = data[i].y;
          break;
        }
      }      
    },
  });
  return [x, y];
}