const touchArea = document.getElementById("touch-area");
const counter = document.getElementById("counter");

function updateCounter(event) {
  counter.textContent = event.touches.length;

  if(event.touches.length == 0){
    touchArea.style.backgroundColor = "rgb(255, 255, 255)";
  }
  if(event.touches.length == 1){
    touchArea.style.backgroundColor = "rgb(0, 255, 145)";
  }
  if(event.touches.length == 2){
    touchArea.style.backgroundColor = "rgb(0, 38, 255)";
  }
   if(event.touches.length == 3){
    touchArea.style.backgroundColor = "rgb(242, 0, 255)";
  }

}

touchArea.addEventListener("touchstart", updateCounter, { passive: false });
touchArea.addEventListener("touchmove", updateCounter, { passive: false });
touchArea.addEventListener("touchend", updateCounter);
touchArea.addEventListener("touchcancel", updateCounter);
