import { Map } from "rot-js";
import Player from "./Player";

class World {
  constructor(width, height, size) {
    this.width = width;
    this.height = height;
    this.size = size;
    this.entities = [new Player(0, 0, 16)];
    this.worldmap = new Array(this.width);
    for (let x = 0; x < this.width; x++) {
      this.worldmap[x] = new Array(this.height);
    }
  }

  get player() {
    return this.entities[0];
  }

  add(entity) {
    this.entities.push(entity);
  }

  remove(entity) {
    this.entities = this.entities.filter((e) => e !== entity);
  }

  moveToSpace(entity) {
    for (let x = entity.x; x < this.width; x++) {
      for (let y = entity.y; y < this.width; y++) {
        if (this.worldmap[x][y] === 0) {
          entity.x = x;
          entity.y = y;
          return;
        }
      }
    }
  }

  isWall(x, y) {
    return (
      this.worldmap[x] === undefined ||
      this.worldmap[y] === undefined ||
      this.worldmap[x][y] === 1
    );
  }

  getEntityAtLocation(x, y) {
    return this.entities.find((entity) => entity.x === x && entity.y === y);
  }

  movePlayer(dx, dy) {
    let tempPlayer = this.player.copyPlayer();
    tempPlayer.move(dx, dy);

    let entity = this.getEntityAtLocation(tempPlayer.x, tempPlayer.y);
    if (entity) {
      entity.action("bump", this);
      this.player.move(dx, dy);
      return;
    }

    if (this.isWall(tempPlayer.x, tempPlayer.y)) {
      console.log(`This way is blocked: ${tempPlayer.x}:${tempPlayer.y}`);
    } else {
      this.player.move(dx, dy);
    }
  }

  createCellularMap() {
    const map = new Map.Cellular(this.width, this.height, { connected: true });
    map.randomize(0.5);
    const userCallback = (x, y, value) => {
      if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
        this.worldmap[x][y] = 1;
        return;
      }
      this.worldmap[x][y] = value === 0 ? 1 : 0;
    };
    map.create(userCallback);
    map.connect(userCallback, 1);
  }

  draw(context) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.worldmap[x][y] === 1) this.drawWall(context, x, y);
      }
    }
    this.entities.forEach((entity) => {
      entity.draw(context);
    });
  }

  drawWall(context, x, y) {
    context.fillStyle = "#000";
    context.fillRect(x * this.size, y * this.size, this.size, this.size);
  }
}

export default World;
