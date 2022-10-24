window.onload = function () {
  const canvas = document.getElementById("map");
  const context = canvas.getContext("2d");
  const img = new Image();
  img.src = "../utils/metrof_r.png";
  // width = 987
  // height = 952
  img.onload = () => {
    console.log(img.height);
    context.drawImage(img, 0, 0, img.width * 0.7, img.height * 0.7);
  };
};

$.ajax({
  url: "http://localhost:3000/positions",
  dataType: "json",
  type: "GET",
  async: false,
  success: function (data) {
    console.log("success");
    console.log(data);
  },
});

var canvas = document.getElementById("map");
console.log(canvas);
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();
