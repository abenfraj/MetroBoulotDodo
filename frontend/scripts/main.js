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
  context.beginPath();
  context.arc(x, y, 4.5, 0, 2 * Math.PI);
  context.fillStyle = 'white';
  context.fill();
  context.lineWidth = 1.5;
  context.strokeStyle = 'black';
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