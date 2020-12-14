// The first two coordinates are one end, the second two are the other end.
 windowWidth = window.innerWidth;
 windowHeight = window.innerHeight;
// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");
// I found that - 20 worked well for me, YMMV
canvas.width = windowWidth - 20;
canvas.height = windowHeight - 20;

ref = canvas.height - 3

canvas.style.border = "1px solid black";
// Set up the context for the animation
context = canvas.getContext("2d");
// Fire up the animation engine
window.requestAnimationFrame(drawAll);
var xCoord = 0;
var yCoord = 0;
var pos = [canvas.width/2,ref - 70];
var size = 70;
var vel = 0;
var jumpVel = [-30,-22,-15,-11,-9,-7,-5,-3,-2,-1,0,1,2,3,5,7,9,11,15,22,30]
var jumpFrame = 0;
var jump = false;
var timeSinceShot = 0;
var fireRate = 100;
var bulletLength = 100;
var bulletDistance = [0,0]
var shootPos = [0,0]
var timer = 0;
var xDist = 0;
var yDist = 0;
var lineHyp = 0;
var bulletX = 0;
var bulletY = 0;
var zombieCount = 1;
var zombieSpawned = 0;
var spawnPosition = [0,0]





function onMouseMove (event) {
  xCoord = event.clientX;     // Get the horizontal coordinate
  yCoord = event.clientY;     // Get the vertical coordinate

}

function myKeyDown (event) {
   /*
     Parameters: event object, which contains information about the event
       that triggered the event listener.
     Returns: None, but modifies global variables which track response to event.
     Purpose: Make the animation respond to keys being pressed.
   */
   // One of the attributes of the event object is 'which,' contains the key
   //   that was pressed to trigger the event listener.

   keyCode = event.which;
   keyStr = event.key;

   if (keyStr == 'a') {
     vel = -7;
   }
   else if (keyStr == 'd') {
     vel = 7;
   }
   else if (keyStr == "w") {
     jump = true;
   }
   else {
     vel = 0;
   }
 }




 function drawAll()
 /*
   Purpose: This is the main drawing loop.
   Inputs: None, but it is affected by what the other functions are doing
   Returns: None, but it calls itself to cycle to the next frame
 */
 {
   context.clearRect(0,0,canvas.width,canvas.height);
   document.addEventListener("keydown", myKeyDown);
   document.addEventListener("mousemove",onMouseMove);

     if (timeSinceShot > fireRate) {
       startPosX = (pos[0] + size/2)
       startPosY = (pos[1] + size/2)
       bullet = new Bullet(startPosX,startPosY,bulletLength,xCoord,yCoord,size,context)
       timeSinceShot = 0;
     }
     if (timer > fireRate) {
     bullet.draw()
     bullet.shoot()
   }
   if (zombieCount > zombieSpawned) {
     spawnPosition = [Math.random() * canvas.width, ref - 70]
     zombie = new Zombie(spawnPosition,context)
     console.log(zombie)
     zombieSpawned += 1;
   }
   zombie.draw()

   timeSinceShot += 1;
   timer += 1;
   pos[0] += vel;

   context.beginPath();
   context.rect(pos[0],pos[1],size,size);
   context.stroke();


   window.requestAnimationFrame(drawAll);

 }
