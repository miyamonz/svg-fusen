import { useState, useEffect } from "react";
import { useFuncs } from "./store";

export default function useMouseDrag(element) {
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [end, setEnd] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);

  const { eventToPos } = useFuncs();

  const onMouseDown = e => {
    if (e.target !== element) return;

    const pos = eventToPos(e);
    setStart(pos);
    setEnd(pos);
    setDrag(true);
  };
  const onMouseUp = e => {
    const pos = eventToPos(e);

    setEnd(pos);
    setDrag(false);
  };
  const onMouseMove = e => {
    const pos = eventToPos(e);
    if (drag) setEnd(pos);
  };

  return [{ start, end, drag }, { onMouseMove, onMouseUp, onMouseDown }];
}
