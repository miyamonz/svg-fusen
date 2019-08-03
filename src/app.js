import React, { useState, useEffect } from "react";

const getXY = e => ({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
const createRect = a => b => {
  const width = Math.abs(a.x - b.x);
  const height = Math.abs(a.y - b.y);

  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);

  return { x, y, width, height };
};

function useCreateRect() {
  const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 90 });
  const [mouse, setMouse] = useState(null);

  const r = createRect(mouse);
  const onMouseDown = e => {
    const xy = getXY(e);
    setRect({ ...xy, width: 0, height: 0 });
    setMouse(xy);
  };
  const onMouseUp = e => {
    setMouse(null);
    setRect(r(getXY(e)));
  };
  const onMouseMove = e => {
    if (mouse) setRect(r(getXY(e)));
  };

  return [{ rect, mouse }, { onMouseMove, onMouseUp, onMouseDown }];
}
export default function App() {
  const [{ rect, mouse }, handlers] = useCreateRect();
  const [rects, setRects] = useState([]);

  useEffect(
    () => {
      if (!mouse) setRects(prev => [...prev, rect]);
    },
    [mouse]
  );
  return (
    <svg width="100%" height="100%" {...handlers}>
      {mouse && <rect {...rect} fill="red" />}
      {rects.map(r => (
        <rect key={JSON.stringify(r)} {...r} stroke="black" fill="none" />
      ))}
    </svg>
  );
}
