import React, { useRef, useEffect } from "react";

const Rogue = ({ width, height, size }) => {
  const canvasRef = useRef();
  useEffect(() => {
    console.log("Draw to canvas");
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
