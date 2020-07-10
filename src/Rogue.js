import React, { useRef, useEffect } from "react";
import InputManager from "./InputManager";

const Rogue = ({ width, height, size }) => {
  const canvasRef = useRef();

  let inputManager = new InputManager();

  const handleInput = (action, data) => {
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
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
    ctx.fillRect(12, 22, 16, 16);
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
