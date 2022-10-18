window.onload = function(){
    const canvas = document.getElementById('map');
    const context = canvas.getContext('2d');
    const img = new Image();        
    img.src = '../utils/metrof_r.png';        
    img.onload = () => {          
        context.drawImage(img, 0, 0);        
    };
}