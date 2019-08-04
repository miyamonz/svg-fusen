import React, { useState, useEffect, useRef } from "react";
import useCreateRect from "./useCreateRect";
import useScroll from "./useScroll";

import Rect from "./Rect";

export default function App() {
  const svgRef = useRef();

  const [{ rect, mouse }, handlers] = useCreateRect(svgRef.current);

  const [viewbox, setViewbox] = useState({
    x: 0,
    y: 0,
    width: 1,
    height: 1
  });
  useEffect(() => {
    setViewbox(prev => ({
      ...prev,
      width: svgRef.current.clientWidth,
      height: svgRef.current.clientHeight
    }));
  }, []);

  useScroll(svgRef.current, setViewbox);

  //add rect to array
  const [rects, setRects] = useState([]);
  useEffect(
    () => {
      if (!mouse && rect.width * rect.height !== 0)
        setRects(prev => [...prev, rect]);
    },
    [mouse]
  );

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`${viewbox.x} ${viewbox.y} ${viewbox.width} ${viewbox.height}`}
      {...handlers}
    >
      <text x={100} y={100}>
        hello
      </text>
      {rects.map(r => (
        <Rect key={JSON.stringify(r)} {...r} />
      ))}
      {mouse && <rect {...rect} fill="red" />}
    </svg>
  );
}
