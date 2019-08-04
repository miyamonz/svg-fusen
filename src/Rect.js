import React, { useState, useEffect } from "react";
export default function Rect(rectData) {
  const [color, setColor] = useState("lightgray");
  const onMouseDown = e => {
    console.log(e);
    setColor("yellow");
  };
  return (
    <rect {...rectData} onMouseDown={onMouseDown} stroke="black" fill={color} />
  );
}
