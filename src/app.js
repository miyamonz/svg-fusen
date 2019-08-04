import React, { useState, useEffect, useRef } from "react";
import useCreateRect from "./useCreateRect";

import Rect from "./Rect";

export default function App() {
  const [{ rect, mouse }, handlers] = useCreateRect(svgRef);
  const [rects, setRects] = useState([]);

  const svgRef = useRef(true);
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

  useEffect(
    () => {
      if (!mouse && rect.width * rect.height !== 0)
        setRects(prev => [...prev, rect]);
    },
    [mouse]
  );

  useEffect(() => {
    const onWheel = e => {
      e.preventDefault();
      if (e.ctrlKey) {
        //zoom
        const perX = e.offsetX / svgRef.current.clientWidth;
        const perY = e.offsetY / svgRef.current.clientHeight;
        const scale = 1 + e.deltaY * 0.01;
        setViewbox(prev => ({
          x: prev.x - prev.width * perX * e.deltaY * 0.01,
          y: prev.y - prev.height * perY * e.deltaY * 0.01,
          width: prev.width * scale,
          height: prev.height * scale
        }));
      } else {
        //translate
        setViewbox(prev => {
          const scale = prev.width / svgRef.current.clientWidth;
          return {
            ...prev,
            x: prev.x + scale * e.deltaX,
            y: prev.y + scale * e.deltaY
          };
        });
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

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
