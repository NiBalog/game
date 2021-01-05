// The first two coordinates are one end, the second two are the other end.
 windowWidth = window.innerWidth;
 windowHeight = window.innerHeight;
// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");
// I found that - 20 worked well for me, YMMV
canvas.width = windowWidth - 10;
canvas.height = windowHeight - 10;

ref = canvas.height - 3

canvas.style.border = "5px solid black";
// Set up the context for the animation
context = canvas.getContext("2d");
// Fire up the animation engine
window.requestAnimationFrame(drawAll);
var xCoord = 0;
var yCoord = 0;
var xClick = 0;
var yClick = 0;
var pos = [canvas.width/2,ref - 70];
var size = 70;
var vel = 0;
var jumpVel = [-35,-30,-22,-16,-12,-9,-7,-4,-2,-1,0,1,2,4,7,9,12,16,22,30,35]
var jumpFrame = 0;
var jump = false;
var isJumping = false;
var jumpSpeed;
var timeSinceShot = 0;
var bulletLength = 100;
var bulletDistance = []
var shootPos = []
var xDist = 0;
var yDist = 0;
var lineHyp = 0;
var bulletX = 0;
var bulletY = 0;
var zombieCount = 0;
var zombieSpawned = 0;
var zombieList = [];
var spawnPosition = [];
var bulletList = [];
var i;
var menu = "welcome";
var upgradePts = 0;
var level = 1;
var healthTotal = 10;
var imageLoaded = "false"
var bulletColors = ["white","blue","green","red","purple","yellow","orange","gray","#ADD8E6"]
var spawnDelay = 0;
var tutorialTimer = 0;
//Zombie Amount / Spawn Timer / Damage / Speed / Health / color / size
var level1Stats = [5,100,0.01,3,1,"green",50]
var level2Stats = [5,95,0.012,3.1,1,"green",50]
var level3Stats = [7,90,0.014,3.2,3,"red",60]
var level4Stats = [7,85,0.016,3.3,3,"red",60]
var level5Stats = [1,0,0.2,5,10,"black",200]
var level6Stats = [8,77,0.018,3.4,6,"purple",70]
var level7Stats = [8,75,0.02,3.5,6,"purple",70]
var level8Stats = [10,73,0.025,3.6,10,"blue",80]
var level9Stats = [10,70,0.03,3.65,10,"blue",80]
var level10Stats = [1,0,0.04,4,30,"white",250]
var level11Stats = [10,65,0.035,3.75,13,"orange",90]
var level12Stats = [10,60,0.04,3.8,13,"orange",90]
var level13Stats = [12,50,0.045,3.85,15,"white",100]
var level14Stats = [12,45,0.05,3.9,15,"white",100]
var level15Stats = [3,0,0.8,5,40,"yellow",300]

var healthLevel = 0
var healthValues = [10,12,15,18,20,23,25,27,30]

var damageLevel = 0
var damageValues = [1,1.5,2,2.5,3,3.5,4,4.5,5]

var bulletSpeedLevel = 0
var speedValues = [10,11,13.5,15,17,19.5,22,25,30]

var fireRateLevel = 0
var fireRateValues = [100,85,70,55,45,30,20,15,10]

var levelList = [level1Stats,level2Stats,level3Stats,level4Stats,level5Stats,level6Stats,
    level7Stats,level8Stats,level9Stats,level10Stats,level11Stats,level12Stats,level13Stats,level14Stats,level15Stats]



function onMouseMove (event) {
  xCoord = event.clientX;     // Get the horizontal coordinate of your cursor
  yCoord = event.clientY;     // Get the vertical coordinate of your cursor

}

function myKeyDown (event) {
   /*
     Parameters: event object, which contains information about the event
       that triggered the event listener.
     Returns: None, but modifies global variables which track response to event.
     Purpose: Make the animation respond to keys being pressed.
   */

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
   else if (keyStr == "q") {
     zombieCount = 5;
   }
   else {
     vel = 0;
   }
 }

 function onMouseClick() {
   xClick = event.pageX;
   yClick = event.pageY;
 }




 function drawAll()
 /*
   Purpose: This is the main drawing loop.
   Inputs: None, but it is affected by what the other functions are doing
   Returns: None, but it calls itself to cycle to the next frame
 */

 {
   document.addEventListener("keydown", myKeyDown);
   document.addEventListener("mousemove",onMouseMove);
   document.addEventListener("mousedown",onMouseClick)

   //Draws the welcome menu and checks for clicks
   if (menu == "welcome") {
     //Draws the menu
     var welcome = new Image();
     welcome.src = "welcome.png"
     welcome.onload = function() {
     context.drawImage(welcome,canvas.width * 0.07,canvas.height * 0.03,welcome.width * 0.8,welcome.height * 0.8);
   }
   //Checks for clicks on the buttons
     if (xClick > 355 && xClick < 660 && yClick < 600 && yClick > 450) {
       xClick = 0;
       yClick = 0;
       menu = "tutorial"
     }
     else if (xClick > 740 && xClick < 1050 && yClick < 625 && yClick > 420) {
       xClick = 0;
       yClick = 0;
       menu = "play"
     }
     else if (xClick > 1120 && xClick < 1440 && yClick < 600 && yClick > 465) {
       xClick = 0;
       yClick = 0;
     }
   }
   //Begins the tutorial
   else if (menu == "tutorial") {
     //Just draws all of the stuff necessary for the tutorial, its the same as the main game so I will explain it there
     var level1 = new Image();
     level1.src = "level1.jpg"
     var scale = Math.min(canvas.width / level1.width, canvas.height / level1.height);
     var x = (canvas.width / 2) - (level1.width / 2) * scale * 1.1;
     var y = (canvas.height / 2) - (level1.height / 2) * scale;
     level1.onload = function() {
     context.drawImage(level1, x, y, level1.width * scale * 1.15, level1.height * scale);
   }
   if (tutorialTimer < 200) {
   context.fillStyle = "white"
   context.textAlign = "center";
   context.font = "40px Arial";
   context.fillText("Welcome to the tutorial",canvas.width/2,120)
  }
   if (tutorialTimer > 200  && tutorialTimer < 400) {
    context.fillText("Here you will learn the basics of how to play the game",canvas.width/2,120)
   }
   if (tutorialTimer > 400  && tutorialTimer < 800) {
    context.fillStyle = "white"
    context.fillText("Use 'a' and 'd' to move left and right and 'w' to jump, try it out here!",canvas.width/2,120)
    context.beginPath();
    context.strokeStyle = "black"
    context.fillStyle = "00FFFF"
    context.rect(pos[0],pos[1],size,size);
    context.fillRect(pos[0],pos[1],size,size);
    context.stroke();
    if (jump == true && isJumping == false) {
       jumpSpeed = setInterval(jumpAnimation,10)
       isJumping = true;
       jump = false;
    }
    function jumpAnimation() {
     if (isJumping == true) {
      jumpFrame += 1
      pos[1] += jumpVel[jumpFrame]
      if (jumpFrame == 19) {
        jumpFrame = 0;
        jump = false;
        isJumping = false;
        clearInterval(jumpSpeed)
      }
     }
    }
   }
   if (tutorialTimer > 800  && tutorialTimer < 1200) {
    context.fillStyle = "white"
    context.font = "30px Arial";
    context.fillText("In order to win, you will have to kill waves of zombies that will increase in difficulty as the game continues",canvas.width/2,120)
       levelStats = levelList[level-1]
       if (5 > zombieSpawned) {
         spawnPosition = [Math.random() * canvas.width, ref - levelStats[6]]
         zombie = new Zombie(spawnPosition,levelStats, context)
         zombieList.push(zombie)
         zombieSpawned += 1;
         zombie.draw()
         spawnDelay = 0;
       }
       for (i = 0; i < zombieList.length; i++) {
         currentZombie = zombieList[i]
         context.strokeStyle = "black"
         context.lineWidth = currentZombie.width
         context.fillStyle = levelStats[5]
         context.beginPath();
         context.rect(currentZombie.pt[0],currentZombie.pt[1],currentZombie.size,currentZombie.size)
         context.fillRect(currentZombie.pt[0],currentZombie.pt[1],currentZombie.size,currentZombie.size)
         context.stroke();
       }
   }
   if (tutorialTimer > 1200 && tutorialTimer < 1800) {
   context.fillStyle = "white"
   context.font = "33px Arial";
   context.fillText("Each level, more zombies will spawn with better stats, including higher damage and more health.",canvas.width/2,120)
   context.fillText("Each time the health of the zombies increase, their color will change, so you know when they will take more shots to kill",canvas.width/2,180)
      levelStats = levelList[13]
      if (5 > zombieSpawned) {
        spawnPosition = [Math.random() * canvas.width, ref - levelStats[6]]
        zombie = new Zombie(spawnPosition,levelStats, context)
        zombieList.push(zombie)
        zombieSpawned += 1;
        zombie.draw()
        spawnDelay = 0;
      }
      for (i = 0; i < zombieList.length; i++) {
        currentZombie = zombieList[i]
        context.strokeStyle = "black"
        context.lineWidth = currentZombie.width
        context.fillStyle = levelStats[5]
        context.beginPath();
        context.rect(currentZombie.pt[0],currentZombie.pt[1],currentZombie.size,currentZombie.size)
        context.fillRect(currentZombie.pt[0],currentZombie.pt[1],currentZombie.size,currentZombie.size)
        context.stroke();
      }
    }
  if (tutorialTimer > 1800 && tutorialTimer < 2600) {
    context.fillStyle = "white"
    context.font = "33px Arial";
    context.fillText("In order to kill these zombies, bullets will spawn out of your square",canvas.width/2,120)
    context.fillText("The bullets will go towards your cursor, and hitting the zombies with them will deal damage",canvas.width/2,180)
    context.fillText("Try killing these zombies!",canvas.width/2,240)

    if (timeSinceShot > fireRateValues[fireRateLevel]) {
      startPosX = (pos[0] + size/2)
      startPosY = (pos[1] + size/2)
      bullet = new Bullet(startPosX,startPosY,bulletLength,xCoord,yCoord,size,context)
      bulletList.push(bullet)
      timeSinceShot = 0;
    }
    for (i = 0; i < bulletList.length; i++) {
      currentBullet = bulletList[i]
      pt1 = currentBullet.pt1
      pt2 = currentBullet.pt2
      xDist = currentBullet.xDist
      yDist = currentBullet.yDist
      context.strokeStyle = bulletColors[damageLevel];
      context.lineWidth = currentBullet.width;
      context.lineCap = currentBullet.cap;
      context.beginPath();
      context.moveTo(pt1[0], pt1[1]);
      context.lineTo(pt2[0], pt2[1]);
      context.stroke();
      if (xDist > 0) {
        currentBullet.pt1[0] += speedValues[bulletSpeedLevel];
        currentBullet.pt1[1] += (speedValues[bulletSpeedLevel]) * (yDist/xDist);
        currentBullet.pt2[0] += speedValues[bulletSpeedLevel];
        currentBullet.pt2[1] += (speedValues[bulletSpeedLevel]) * (yDist/xDist);
      }
      if (xDist < 0) {
        currentBullet.pt1[0] -= speedValues[bulletSpeedLevel];
        currentBullet.pt1[1] -= (speedValues[bulletSpeedLevel]) * (yDist/xDist);
        currentBullet.pt2[0] -= speedValues[bulletSpeedLevel];
        currentBullet.pt2[1] -= (speedValues[bulletSpeedLevel]) * (yDist/xDist);
      }


      if (pt1[0] > canvas.width || pt1[0] < 0 || pt1[1] > canvas.height || pt1[1] < 0) {
        bulletList.splice(i,1)
      }

    }
  levelStats = levelList[level-1]
  if (levelStats[0] > zombieSpawned && spawnDelay > levelStats[1]) {
    spawnPosition = [Math.random() * canvas.width, ref - levelStats[6]]
    zombie = new Zombie(spawnPosition,levelStats, context)
    zombieList.push(zombie)
    zombieSpawned += 1;
    zombie.draw()
    spawnDelay = 0;
  }

  for (i = 0; i < zombieList.length; i++) {
    currentZombie = zombieList[i]
    context.strokeStyle = "black"
    context.lineWidth = currentZombie.width
    context.fillStyle = levelStats[5]
    var posDiff = pos[0] - currentZombie.pt[0]
    if (posDiff > 0) {
      currentZombie.pt[0] += currentZombie.speed
    }
    else {
      currentZombie.pt[0] -= currentZombie.speed
    }
    context.beginPath();
    context.rect(currentZombie.pt[0],currentZombie.pt[1],currentZombie.size,currentZombie.size)
    context.fillRect(currentZombie.pt[0],currentZombie.pt[1],currentZombie.size,currentZombie.size)
    context.stroke();
    if (pos[0] < currentZombie.pt[0] + currentZombie.size && pos[0] > currentZombie.pt[0]){
      healthTotal -= levelStats[2];
    }
    else if (pos[0] + size < currentZombie.pt[0] + currentZombie.size && pos[0]+size > currentZombie.pt[0]){
      healthTotal -= levelStats[2];
    }
    for (u = 0; u < bulletList.length; u++) {
      currentBullet = bulletList[u]
      if (currentBullet.pt2[0] > currentZombie.pt[0] && currentBullet.pt2[0] < currentZombie.pt[0] + currentZombie.size && currentBullet.pt2[1] > currentZombie.pt[1] && currentBullet.pt2[1] < currentZombie.pt[1] + currentZombie.size) {
        currentZombie.health -= damageValues[damageLevel];
        bulletList.splice(u,1)
       if (currentZombie.health <= 0) {
       zombieList.splice(i,1)

     }
       if (zombieList.length == 0 && zombieSpawned == levelStats[0]) {
         zombieSpawned = 0;
         level += 1;
         upgradePts += 2;
         healthTotal = healthValues[healthLevel]
       }
     }
    }
  }
  context.beginPath();
  context.strokeStyle = "black"
  context.fillStyle = "00FFFF"
  context.rect(pos[0],pos[1],size,size);
  context.fillRect(pos[0],pos[1],size,size);
  context.stroke();

  }
  if (tutorialTimer > 2600 && tutorialTimer < 3400) {
    context.fillStyle = "white"
    context.font = "33px Arial";
    context.textAlign = "left"
    context.fillText("You are also going to need some upgrades",canvas.width/2 - 400,120)
    context.fillText("As you can see on the left, you can upgrade your stats",canvas.width/2 - 400,180)
    context.fillText("You get 2 upgrade points after each level",canvas.width/2 - 400,240)
    context.fillText("You can use those points to upgrade your health (green), damage (red),",canvas.width/2 - 400,300)
    context.fillText("bullet speed (gold), and fire rate (blue), click on the plus icons to upgrade each stat",canvas.width/2 - 400,360)
    upgradePts = 100;
    var health = new Image();
    health.src = "health" + healthLevel + ".png"
    health.onload = function() {
    context.drawImage(health, -50, -75, health.width * 0.25, health.height* 0.25);
  }
   var damage = new Image();
   damage.src = "damage" + damageLevel + ".png"
   damage.onload = function() {
   context.drawImage(damage, -50, 25, damage.width * 0.25, damage.height* 0.25);
   }
   var speed = new Image();
   speed.src = "speed" + bulletSpeedLevel + ".png"
   speed.onload = function() {
   context.drawImage(speed, -50, 125, speed.width * 0.25, speed.height* 0.25);
   }
   var fireRate = new Image();
   fireRate.src = "fireRate" + fireRateLevel + ".png"
   fireRate.onload = function() {
   context.drawImage(fireRate, -50, 225, fireRate.width * 0.25, fireRate.height* 0.25);
   }
   if (upgradePts > 0) {
   if (healthLevel < 8) {
     var upgrade = new Image();
     upgrade.src = "upgrade.png"
     upgrade.onload = function() {
     context.drawImage(upgrade, 150, -107, upgrade.width * 0.3, upgrade.height* 0.3);}
     if (xClick > 370 && xClick < 460 && yClick > 20 && yClick < 110) {
       healthLevel += 1
       upgradePts -= 1
       xClick = 0;
       yClick = 0;
     }
     }
   if (damageLevel < 8) {
     var upgrade = new Image();
     upgrade.src = "upgrade.png"
     upgrade.onload = function() {
     context.drawImage(upgrade, 150, -7, upgrade.width * 0.3, upgrade.height* 0.3);}
     if (xClick > 370 && xClick < 460 && yClick > 120 && yClick < 210) {
       damageLevel += 1
       upgradePts -= 1
       xClick = 0;
       yClick = 0;
     }
     }
   if (bulletSpeedLevel < 8) {
     var upgrade = new Image();
     upgrade.src = "upgrade.png"
     upgrade.onload = function() {
     context.drawImage(upgrade, 150, 93, upgrade.width * 0.3, upgrade.height* 0.3);}
     if (xClick > 370 && xClick < 460 && yClick > 220 && yClick < 310) {
       bulletSpeedLevel += 1
       upgradePts -= 1
       xClick = 0;
       yClick = 0;
     }
     }
   if (fireRateLevel < 8) {
     var upgrade = new Image();
     upgrade.src = "upgrade.png"
     upgrade.onload = function() {
     context.drawImage(upgrade, 150, 193, upgrade.width * 0.3, upgrade.height* 0.3);}
     if (xClick > 370 && xClick < 460 && yClick > 320 && yClick < 410) {
       fireRateLevel += 1
       upgradePts -= 1
       xClick = 0;
       yClick = 0;
     }
     }
   }
  }
  if (tutorialTimer > 3400 && tutorialTimer < 3600) {
    context.fillStyle = "white"
    context.font = "33px Arial";
    context.textAlign = "center"
    context.fillText("Every 5 levels you will fight a boss, a big zombie with increased health, size, and damage",canvas.width/2,120)
  }
  if (tutorialTimer > 3600 && tutorialTimer < 3800) {
      context.fillText("Well, I'm done, I'm sure you can figure the rest out, Good Luck!",canvas.width/2,120)
    }
  if (tutorialTimer > 3800) {
    tutorialTimer = 0;
    menu = "welcome"
    vel = 0;
    jumpVel = [-35,-30,-22,-16,-12,-9,-7,-4,-2,-1,0,1,2,4,7,9,12,16,22,30,35]
    jumpFrame = 0;
    jump = false;
    isJumping = false;
    jumpSpeed;
    timeSinceShot = 0;
    bulletLength = 100;
    bulletDistance = []
    shootPos = []
    zombieSpawned = 0;
    zombieList = [];
    spawnPosition = [];
    bulletList = [];
    menu = "welcome";
    upgradePts = 0;
    level = 1;
    healthTotal = 10;
    spawnDelay = 0;
    healthLevel = 0
    damageLevel = 0
    bulletSpeedLevel = 0
    fireRateLevel = 0
  }

  tutorialTimer += 1
 }

   else if (menu == "play") {
     //Draw the background for each of the levels
       if (level >= 1 && level < 6) {
     var level1 = new Image();
     level1.src = "level1.jpg"
     var scale = Math.min(canvas.width / level1.width, canvas.height / level1.height);
     var x = (canvas.width / 2) - (level1.width / 2) * scale * 1.1;
     var y = (canvas.height / 2) - (level1.height / 2) * scale;
     level1.onload = function() {
     context.drawImage(level1, x, y, level1.width * scale * 1.15, level1.height * scale);
   }
 }
  else if (level > 5 && level < 11) {
    var level2 = new Image();
    level2.src = "level2.jpg"
    level2.onload = function() {
    context.drawImage(level2,0,0);
  }
  }
  else if (level > 10 && level < 16) {
    var level3 = new Image();
    level3.src = "level3.jpg"
    var scale = Math.min(canvas.width / level3.width, canvas.height / level3.height);
    var x = (canvas.width / 2) - (level3.width / 2) * scale * 1.3;
    var y = (canvas.height / 2) - (level3.height / 2) * scale;
    level3.onload = function() {
      context.drawImage(level3, x, y, level3.width * scale * 1.4, level3.height * scale);
  }
  }
    //Checks for jump
    if (jump == true && isJumping == false) {
       jumpSpeed = setInterval(jumpAnimation,10)
       isJumping = true;
       jump = false;
    }
    //Draws the jump animation
       function jumpAnimation() {
        if (isJumping == true) {
         jumpFrame += 1
         pos[1] += jumpVel[jumpFrame]
         if (jumpFrame == 19) {
           jumpFrame = 0;
           jump = false;
           isJumping = false;
           clearInterval(jumpSpeed)
      }
    }
  }



  //Draws bullets based on fireRate and adds them to a list
     if (timeSinceShot > fireRateValues[fireRateLevel]) {
       startPosX = (pos[0] + size/2)
       startPosY = (pos[1] + size/2)
       bullet = new Bullet(startPosX,startPosY,bulletLength,xCoord,yCoord,size,context)
       bulletList.push(bullet)
       timeSinceShot = 0;
     }
    //Updates positions of bullets and deletes them if they go off screen
     for (i = 0; i < bulletList.length; i++) {
       currentBullet = bulletList[i]
       pt1 = currentBullet.pt1
       pt2 = currentBullet.pt2
       xDist = currentBullet.xDist
       yDist = currentBullet.yDist
       context.strokeStyle = bulletColors[damageLevel];
       context.lineWidth = currentBullet.width;
       context.lineCap = currentBullet.cap;
       context.beginPath();
       context.moveTo(pt1[0], pt1[1]);
       context.lineTo(pt2[0], pt2[1]);
       context.stroke();
       if (xDist > 0) {
         currentBullet.pt1[0] += speedValues[bulletSpeedLevel];
         currentBullet.pt1[1] += (speedValues[bulletSpeedLevel]) * (yDist/xDist);
         currentBullet.pt2[0] += speedValues[bulletSpeedLevel];
         currentBullet.pt2[1] += (speedValues[bulletSpeedLevel]) * (yDist/xDist);
       }
       if (xDist < 0) {
         currentBullet.pt1[0] -= speedValues[bulletSpeedLevel];
         currentBullet.pt1[1] -= (speedValues[bulletSpeedLevel]) * (yDist/xDist);
         currentBullet.pt2[0] -= speedValues[bulletSpeedLevel];
         currentBullet.pt2[1] -= (speedValues[bulletSpeedLevel]) * (yDist/xDist);
       }


       if (pt1[0] > canvas.width || pt1[0] < 0 || pt1[1] > canvas.height || pt1[1] < 0) {
         bulletList.splice(i,1)
       }
     }
  //Spawns zombies with stats depending on the level and adds them to a list
   levelStats = levelList[level-1]
   if (levelStats[0] > zombieSpawned && spawnDelay > levelStats[1]) {
     spawnPosition = [Math.random() * canvas.width, ref - levelStats[6]]
     zombie = new Zombie(spawnPosition,levelStats, context)
     zombieList.push(zombie)
     zombieSpawned += 1;
     zombie.draw()
     spawnDelay = 0;
   }
  //Updates the positions of the zombies and checks if they get hit by bullets
   for (i = 0; i < zombieList.length; i++) {
     currentZombie = zombieList[i]
     context.strokeStyle = "black"
     context.lineWidth = currentZombie.width
     context.fillStyle = levelStats[5]
     var posDiff = pos[0] - currentZombie.pt[0]
     if (posDiff > 0) {
       currentZombie.pt[0] += currentZombie.speed
     }
     else {
       currentZombie.pt[0] -= currentZombie.speed
     }
     context.beginPath();
     context.rect(currentZombie.pt[0],currentZombie.pt[1],currentZombie.size,currentZombie.size)
     context.fillRect(currentZombie.pt[0],currentZombie.pt[1],currentZombie.size,currentZombie.size)
     context.stroke();
     if (pos[0] < currentZombie.pt[0] + currentZombie.size && pos[0] > currentZombie.pt[0]){
       healthTotal -= levelStats[2];
     }
     else if (pos[0] + size < currentZombie.pt[0] + currentZombie.size && pos[0]+size > currentZombie.pt[0]){
       healthTotal -= levelStats[2];
     }
     for (u = 0; u < bulletList.length; u++) {
       currentBullet = bulletList[u]
       if (currentBullet.pt2[0] > currentZombie.pt[0] && currentBullet.pt2[0] < currentZombie.pt[0] + currentZombie.size && currentBullet.pt2[1] > currentZombie.pt[1] && currentBullet.pt2[1] < currentZombie.pt[1] + currentZombie.size) {
         currentZombie.health -= damageValues[damageLevel];
         bulletList.splice(u,1)
        if (currentZombie.health <= 0) {
        zombieList.splice(i,1)

      }
        if (zombieList.length == 0 && zombieSpawned == levelStats[0]) {
          zombieSpawned = 0;
          level += 1;
          upgradePts += 2;
          healthTotal = healthValues[healthLevel]
        }
      }
     }
   }
   //draws the stats that the player needs to see
   context.fillStyle = "black"
   context.fillText("UPGRADE: " + upgradePts,1000,240)
   context.fillText("LEVEL: " + level, 1000, 170);
   context.fillText("HEALTH: " + Math.round(healthTotal),1000,100);
   //checks if the player runs out of health and ends game if you do
   if (healthTotal < 0) {
     context.textAlign = "center"
     context.fillStyle = "black"
     context.font = "48px Arial"
     context.clearRect(0,0,canvas.width,canvas.height)
     context.fillText("GAME OVER",canvas.width/2,canvas.height/2)
     tutorialTimer +=1


     //this is a continuation of the end game thing
     if (tutorialTimer > 200) {

     menu = "welcome"
     vel = 0;
     jumpVel = [-35,-30,-22,-16,-12,-9,-7,-4,-2,-1,0,1,2,4,7,9,12,16,22,30,35]
     jumpFrame = 0;
     jump = false;
     isJumping = false;
     jumpSpeed;
     timeSinceShot = 0;
     bulletLength = 100;
     bulletDistance = []
     shootPos = []
     zombieSpawned = 0;
     zombieList = [];
     spawnPosition = [];
     bulletList = [];
     upgradePts = 0;
     level = 1;
     healthTotal = 10;
     spawnDelay = 0;
     healthLevel = 0
     damageLevel = 0
     bulletSpeedLevel = 0
     fireRateLevel = 0
     tutorialTimer = 0;
     context.clearRect(0,0,canvas.width,canvas.height)
   }
  }
   //Draws the player square
   context.beginPath();
   context.strokeStyle = "black"
   context.fillStyle = "00FFFF"
   context.rect(pos[0],pos[1],size,size);
   context.fillRect(pos[0],pos[1],size,size);
   context.stroke();

   context.font = "30px Arial";
   //draws the level bars in the top left
   context.fillStyle = "black"
   var health = new Image();
   health.src = "health" + healthLevel + ".png"
   health.onload = function() {
   context.drawImage(health, -50, -75, health.width * 0.25, health.height* 0.25);
 }
  var damage = new Image();
  damage.src = "damage" + damageLevel + ".png"
  damage.onload = function() {
  context.drawImage(damage, -50, 25, damage.width * 0.25, damage.height* 0.25);
  }
  var speed = new Image();
  speed.src = "speed" + bulletSpeedLevel + ".png"
  speed.onload = function() {
  context.drawImage(speed, -50, 125, speed.width * 0.25, speed.height* 0.25);
  }
  var fireRate = new Image();
  fireRate.src = "fireRate" + fireRateLevel + ".png"
  fireRate.onload = function() {
  context.drawImage(fireRate, -50, 225, fireRate.width * 0.25, fireRate.height* 0.25);
  }
  //checks if upgrades are available and draws upgrade buttons and checks for clicks on them
  if (upgradePts > 0) {
  if (healthLevel < 8) {
    var upgrade = new Image();
    upgrade.src = "upgrade.png"
    upgrade.onload = function() {
    context.drawImage(upgrade, 150, -107, upgrade.width * 0.3, upgrade.height* 0.3);}
    if (xClick > 370 && xClick < 460 && yClick > 20 && yClick < 110) {
      healthLevel += 1
      upgradePts -= 1
      xClick = 0;
      yClick = 0;
    }
    }
  if (damageLevel < 8) {
    var upgrade = new Image();
    upgrade.src = "upgrade.png"
    upgrade.onload = function() {
    context.drawImage(upgrade, 150, -7, upgrade.width * 0.3, upgrade.height* 0.3);}
    if (xClick > 370 && xClick < 460 && yClick > 120 && yClick < 210) {
      damageLevel += 1
      upgradePts -= 1
      xClick = 0;
      yClick = 0;
    }
    }
  if (bulletSpeedLevel < 8) {
    var upgrade = new Image();
    upgrade.src = "upgrade.png"
    upgrade.onload = function() {
    context.drawImage(upgrade, 150, 93, upgrade.width * 0.3, upgrade.height* 0.3);}
    if (xClick > 370 && xClick < 460 && yClick > 220 && yClick < 310) {
      bulletSpeedLevel += 1
      upgradePts -= 1
      xClick = 0;
      yClick = 0;
    }
    }
  if (fireRateLevel < 8) {
    var upgrade = new Image();
    upgrade.src = "upgrade.png"
    upgrade.onload = function() {
    context.drawImage(upgrade, 150, 193, upgrade.width * 0.3, upgrade.height* 0.3);}
    if (xClick > 370 && xClick < 460 && yClick > 320 && yClick < 410) {
      fireRateLevel += 1
      upgradePts -= 1
      xClick = 0;
      yClick = 0;
    }
    }


}
}
   // just final values that increase each frame
   timeSinceShot += 1;
   pos[0] += vel;
   spawnDelay += 1

   window.requestAnimationFrame(drawAll);

 }
