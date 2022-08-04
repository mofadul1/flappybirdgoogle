var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;


// this is going to run every single time the animation runs, after each one it'll come to this code and run it then do the next animation. Here we changed the top position of the whole (which was origninally the only one empty when trying to implement this) and make the hole randomly appear at different heights of the block. 
hole.addEventListener('animationiteration', () => {
  // sets the top to be in between -150 or -450, check CSS (Made hole top -500).
  var random = -((Math.random()*300)+150);
  hole.style.top = random + "px";
  counter++;
});

// creating a function that implements gravity into the game
setInterval(function() {
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top")); // gets top position, which is set to 100 in the css
  if (jumping == 0) { // research this one more....?
    character.style.top = (characterTop+3) + "px";
  }
  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  var cTop = -(500-characterTop);
  if ((characterTop > 480) || ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) { // height is 150 pixels but it's 50 px minus height of character since char takes up 20 pixels, so the whole is really just 130 pixels
    alert("Game over. Score: " + counter);
    character.style.top = 100 + "px";
    counter = 0;
  }
  
}, 10); // every 10 milliseconds.

function jump() {
  jumping = 1;
  let jumpCount = 0; // keeps track of how many times this interval below is ran.
  var jumpInterval = setInterval(function(){

    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if ((characterTop > 6) && (jumpCount < 15)) {
      character.style.top = (characterTop-5) + "px";
    }
    if(jumpCount > 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
  },10);
}
