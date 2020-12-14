class Bullet {
  constructor(startPosX,startPosY, bulletLength,xCoord,yCoord,size) {
    xDist = xCoord - startPosX
    yDist = yCoord - startPosY
    lineHyp = Math.sqrt((xDist*xDist) + (yDist*yDist))
    bulletX = startPosX + xDist * (bulletLength/lineHyp)
    bulletY = startPosY + yDist * (bulletLength/lineHyp)

    this.pt1 = [startPosX,startPosY];
    this.pt2 = [bulletX,bulletY]
    this.color = "#000000";
    this.width = 3;
    this.cap = 'round';
  }


draw() {
  context.strokeStyle = this.color;
  context.lineWidth = this.width;
  context.lineCap = this.cap;
  context.beginPath();
  context.moveTo(this.pt1[0], this.pt1[1]);
  context.lineTo(this.pt2[0], this.pt2[1]);
  context.stroke();
}
shoot() {
  this.pt1[0] += 300/xDist;
  this.pt1[1] += (300/xDist) * (yDist/xDist);
  this.pt2[0] += 300/xDist;
  this.pt2[1] += (300/xDist) * (yDist/xDist);




}
}

class Zombie {
  constructor(spawnPosition) {
    this.pt = [spawnPosition[0],spawnPosition[1]]
    this.size = 70
    this.color = "#00ff00";
    this.width = 10;
}
draw() {
  context.strokeStyle = this.color
  context.lineWidth = this.width
  context.beginPath();
  context.rect(this.pt[0],this.pt[1],this.size,this.size)
}
}
