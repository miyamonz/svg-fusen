import { useState, useEffect } from "react";

import useMouseDrag from "./useMouseDrag";

const createRect = a => b => {
  const width = Math.abs(a.x - b.x);
  const height = Math.abs(a.y - b.y);

  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);

  return { x, y, width, height };
};

export function useCreateRect({ start, end, drag }) {
  const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 90 });

  useEffect(
    () => {
      const toRect = createRect(start);
      setRect(toRect(end));
      if (!drag) setRect(null);
    },
    [start, end, drag]
  );

  return rect;
}
export function useCreateCircle(targetElement) {
  const [circle, setCircle] = useState({ cx: 0, cy: 0, r: 0 });

  const [{ start, end, drag }, handlers] = useMouseDrag(targetElement);
  useEffect(
    () => {
      if (drag) {
        const r = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
        setCircle({ cx: start.x, cy: start.y, r });
      }
      if (!drag) setCircle(null);
    },
    [start, end, drag]
  );

  return [{ circle, drag }, handlers];
}
