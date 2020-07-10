import React, { useRef, useEffect, useState } from "react";
import InputManager from "./InputManager";
import World from "./World";
import Spawner from "./Spawner";

const Rogue = ({ width, height, size }) => {
  const canvasRef = useRef();
  const [world, setWorld] = useState(new World(width, height, size));

  let inputManager = new InputManager();

  const handleInput = (action, data) => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld);
  };

  useEffect(() => {
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(10);
    setWorld(newWorld);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    };
  });

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, width * size, height * size);
    world.draw(ctx);
  });

  return (
    <canvas
      ref={canvasRef}
      width={width * size}
      height={height * size}
      style={{
        border: "1px solid black",
        margin: "20px 20px",
        background: "grey",
      }}
    ></canvas>
  );
};

export default Rogue;
