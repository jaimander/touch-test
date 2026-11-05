const touchArea = document.getElementById("touch-area");
const counter = document.getElementById("counter");

function updateCounter(event) {
  counter.textContent = event.touches.length;

  if(counter == 0){
    touchArea.style.backgroundColor = "rgb(255, 255, 255)";
  }
  else{
    touchArea.style.backgroundColor = "rgb(255, 0, 0)";
  }

}

touchArea.addEventListener("touchstart", updateCounter, { passive: false });
touchArea.addEventListener("touchmove", updateCounter, { passive: false });
touchArea.addEventListener("touchend", updateCounter);
touchArea.addEventListener("touchcancel", updateCounter);
