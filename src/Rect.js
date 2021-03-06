import React, { useState, useEffect } from "react";
import { useFuncs } from "./store";

export default function Rect(rectData) {
  const { eventToPos } = useFuncs();

  const [color, setColor] = useState("lightgray");
  const [click, setClick] = useState(null);

  const [rect, setRect] = useState(rectData);

  const onMouseDown = e => {
    setColor("yellow");
    const pos = eventToPos(e);
    const x = pos.x - rect.x;
    const y = pos.y - rect.y;

    setClick({ x, y });
  };
  const onMouseUp = e => {
    setColor("lightgray");
    setClick(null);
  };
  const onMouseMove = e => {
    if (click) {
      const pos = eventToPos(e);
      const x = pos.x - click.x;
      const y = pos.y - click.y;
      setRect(prev => ({ ...prev, x, y }));
    }
  };

  return (
    <rect
      {...rect}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      stroke="black"
      fill={color}
    />
  );
}
