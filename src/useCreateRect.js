import { useState, useEffect } from "react";

const getXY = e => ({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
const createRect = a => b => {
  const width = Math.abs(a.x - b.x);
  const height = Math.abs(a.y - b.y);

  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);

  return { x, y, width, height };
};

export default function useCreateRect(targetElement) {
  const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 90 });
  const [mouse, setMouse] = useState(null);

  const r = createRect(mouse);
  const onMouseDown = e => {
    if (e.target !== targetElement) {
      return;
    }
    const xy = getXY(e);
    setRect({ ...xy, width: 0, height: 0 });
    setMouse(xy);
  };
  const onMouseUp = e => {
    if (!mouse) return;
    setMouse(null);
    setRect(r(getXY(e)));
  };
  const onMouseMove = e => {
    if (mouse) setRect(r(getXY(e)));
  };

  return [{ rect, mouse }, { onMouseMove, onMouseUp, onMouseDown }];
}
