function myMove() {
  var elem = document.getElementById("dot");   
  var colorArray = ["yellow", "lightyellow", "yellow"];
  var id = setInterval(frame, 200);
  var posx = 50;
  var posy = 50;
  var num = 0;	
  function frame() {
    if (elem.style.left == 500) {
      clearInterval(id);
    } else {
      num = Math.random()*200;
      elem.style.width = num + "px";
      elem.style.height = num + "px";
      posx += Math.random()*10; 
      posy += Math.random()*10;
      elem.style.bottom = posy + "px"; 
      elem.style.left = posx + "px"; 
      elem.style.backgroundColor = colorArray[Math.floor(Math.random()*colorArray.length)];
    }
  }
}