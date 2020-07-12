import Entity from "./Entity";

class Loot extends Entity {
  action(verb, world) {
    if (verb === "bump") {
      if (this.attributes.name === "Health Potion") {
        world.player.attributes.health =
          parseInt(world.player.attributes.health) + 1;
        world.addToHistory("You found a health potion!");
        world.addToHistory(`You have ${world.player.attributes.health} health`);
      } else {
        world.player.add(this);
      }
      world.remove(this);
    }
    if (verb === "drop") {
      console.log("drop", this);
    }
  }
}

export default Loot;
