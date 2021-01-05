class Bullet {
  constructor(startPosX,startPosY, bulletLength,xCoord,yCoord,size) {
    xDist = xCoord - startPosX
    yDist = yCoord - startPosY
    lineHyp = Math.sqrt((xDist*xDist) + (yDist*yDist))
    bulletX = startPosX + xDist * (bulletLength/lineHyp)
    bulletY = startPosY + yDist * (bulletLength/lineHyp)

    this.pt1 = [startPosX,startPosY];
    this.pt2 = [bulletX,bulletY]
    this.width = 3;
    this.cap = 'round';
    this.xDist = xDist
    this.yDist = yDist
  }
}

class Zombie {
  constructor(spawnPosition,levelStats) {
    this.pt = [spawnPosition[0],spawnPosition[1]]
    this.size = levelStats[6]
    this.color = "#000000";
    this.width = 5;
    this.fillStyle = "00ff00"
    this.health = levelStats[4]
    this.speed = Math.random() * levelStats[3]
}
draw() {

}
}
