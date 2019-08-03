import React, { useState, useEffect } from "react";
import useCreateRect from "./useCreateRect";

export default function App() {
  const [{ rect, mouse }, handlers] = useCreateRect();
  const [rects, setRects] = useState([]);

  useEffect(
    () => {
      if (!mouse && rect.width * rect.height !== 0)
        setRects(prev => [...prev, rect]);
    },
    [mouse]
  );
  return (
    <svg width="100%" height="100%" {...handlers}>
      {rects.map(r => (
        <rect key={JSON.stringify(r)} {...r} stroke="black" fill="lightgray" />
      ))}
      {mouse && <rect {...rect} fill="red" />}
    </svg>
  );
}
