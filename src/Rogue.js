import React, { useRef, useEffect, useState } from "react";
import InputManager from "./InputManager";

const Rogue = ({ width, height, size }) => {
  const canvasRef = useRef();
  const [player, setPlayer] = useState({ x: 64, y: 128 });

  let inputManager = new InputManager();

  const handleInput = (action, data) => {
    let newPlayer = { ...player };
    newPlayer.x += data.x * size;
    newPlayer.y += data.y * size;
    setPlayer(newPlayer);
  };

  useEffect(() => {
    console.log("Bind input");
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
    ctx.fillStyle = "#000";
    ctx.fillRect(player.x, player.y, 16, 16);
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
