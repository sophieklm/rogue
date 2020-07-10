class World {
  constructor(width, height, size) {
    this.width = width;
    this.height = height;
    this.size = size;
    this.worldmap = new Array(this.width);
    for (let x = 0; x < this.width; x++) {
      this.worldmap[x] = new Array(this.height);
    }
    this.createRandomMap();
  }

  createRandomMap() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.worldmap[x][y] = Math.round(Math.random());
      }
    }
  }

  draw(context) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.worldmap[x][y] === 1) this.drawWall(context, x, y);
      }
    }
  }

  drawWall(context, x, y) {
    context.fillStyle = "#000";
    context.fillRect(x * this.size, y * this.size, this.size, this.size);
  }
}

export default World;
