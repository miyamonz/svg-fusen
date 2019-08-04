import { useState, useEffect } from "react";

import useMouseDrag from "./useMouseDrag";

const createRect = a => b => {
  const width = Math.abs(a.x - b.x);
  const height = Math.abs(a.y - b.y);

  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);

  return { x, y, width, height };
};

export default function useCreateRect(targetElement) {
  const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 90 });

  const [{ start, end, drag }, handlers] = useMouseDrag(targetElement);
  useEffect(
    () => {
      const toRect = createRect(start);
      setRect(toRect(end));
      if (!drag) setRect(null);
    },
    [start, end, drag]
  );

  return [{ rect, drag }, handlers];
}
