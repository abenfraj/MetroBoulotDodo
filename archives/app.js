const setupCanvas = () => {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const layout = canvas.getContext("2d");
    const image = new Image();
    image.src = "./metrof_r.png";
    image.onload = () => {
      layout.drawImage(image, 0, 0);
    };
  }
};