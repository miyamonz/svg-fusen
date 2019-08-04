import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import useStore, { useFuncs } from "./store";

import { Provider } from "./eventToSVGPos";

import useCreateRect from "./useCreateRect";
import useScroll from "./useScroll";

import Rect from "./Rect";

const lineStyle = {
  stroke: "gray",
  strokeWidth: 0.4
};
const LinesV = () =>
  Array.from({ length: 100 }, (_, i) => (
    <line key={i} x1={0} y1={i * 20} x2={1200} y2={i * 20} {...lineStyle} />
  ));
const LinesH = () =>
  Array.from({ length: 100 }, (_, i) => (
    <line key={i} x1={i * 20} y1={0} x2={i * 20} y2={980} {...lineStyle} />
  ));
export default function App() {
  const svgRef = useRef();

  const [{ rect, mouse }, handlers] = useCreateRect(svgRef.current);

  const [state, dispatch] = useStore();
  const viewbox = state.viewbox;
  const setViewbox = update =>
    dispatch(({ viewbox }) => ({ viewbox: update(viewbox) }));

  //set viewbox as rect
  useLayoutEffect(() => {
    setViewbox(prev => ({
      ...prev,
      width: svgRef.current.clientWidth,
      height: svgRef.current.clientHeight
    }));
  }, []);

  //update rect of svg
  useLayoutEffect(
    () => {
      const { x, y, width, height } = svgRef.current.getBoundingClientRect();
      const element = { x, y, width, height };
      dispatch(() => ({
        element
      }));
    },
    [svgRef]
  );

  useScroll(svgRef.current, setViewbox);

  const { viewBox } = useFuncs();

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
    <Provider target={svgRef.current} viewbox={viewbox}>
      <svg viewBox={viewBox} {...handlers}>
        <LinesV />
        <LinesH />
        <text x={100} y={100}>
          hello
        </text>
      </svg>
      <svg ref={svgRef} viewBox={viewBox} {...handlers}>
        {rects.map(r => (
          <Rect key={JSON.stringify(r)} {...r} />
        ))}
        {mouse && <rect {...rect} fill="red" />}
      </svg>
    </Provider>
  );
}
