import React, { useRef, useEffect, useState } from "react";
import InputManager from "./InputManager";
import Player from "./Player";
import World from "./World";

const Rogue = ({ width, height, size }) => {
  const canvasRef = useRef();
  const [player, setPlayer] = useState(new Player(1, 2, size));
  const [world, setWorld] = useState(new World(width, height, size));

  let inputManager = new InputManager();

  const handleInput = (action, data) => {
    let newPlayer = new Player();
    Object.assign(newPlayer, player);
    newPlayer.move(data.x, data.y);
    setPlayer(newPlayer);
  };

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
    player.draw(ctx);
  });

  return (
    <canvas
      ref={canvasRef}
      width={width * size}
      height={height * size}
      style={{ border: "1px solid black" }}
    ></canvas>
  );
};

export default Rogue;
