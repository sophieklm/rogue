import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from "./Stairs";

const lootTable = [
  {
    name: "Long Sword",
    colour: "darkgrey",
    ascii: "/",
    offset: { x: 6, y: 3 },
  },
  {
    name: "Health Potion",
    colour: "red",
    ascii: "!",
    offset: { x: 6, y: 3 },
  },
  {
    name: "Gold Coin",
    colour: "yellow",
    ascii: "$",
    offset: { x: 3, y: 3 },
  },
  {
    name: "Light Armour",
    colour: "lightgrey",
    ascii: "#",
    offset: { x: 4, y: 3 },
  },
];

const monsterTable = [
  {
    name: "Dragon",
    colour: "blue",
    ascii: "D",
    offset: { x: 3, y: 3 },
    health: 5,
  },
  {
    name: "Ogre",
    colour: "purple",
    ascii: "O",
    offset: { x: 1, y: 3 },
    health: 4,
  },
  {
    name: "Kobold",
    colour: "darkgreen",
    ascii: "K",
    offset: { x: 3, y: 3 },
    health: 3,
  },
];

class Spawner {
  constructor(world) {
    this.world = world;
  }

  spawn(spawnCount, createEntity) {
    for (let count = 0; count < spawnCount; count++) {
      let entity = createEntity();
      this.world.add(entity);
      this.world.moveToSpace(entity);
    }
  }

  spawnLoot(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Loot(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.size,
        lootTable[getRandomInt(lootTable.length)]
      );
    });
  }

  spawnMonsters(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Monster(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.size,
        monsterTable[getRandomInt(monsterTable.length)]
      );
    });
  }

  spawnStairs() {
    let stairs = new Stairs(
      this.world.width - 10,
      this.world.height - 10,
      this.world.size
    );
    this.world.add(stairs);
    this.world.moveToSpace(stairs);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;
