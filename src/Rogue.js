import React from "react";

const Rogue = ({ width, height, size }) => (
  <canvas
    width={width * size}
    height={height * size}
    style={{ border: "1px solid black" }}
  ></canvas>
);

export default Rogue;
