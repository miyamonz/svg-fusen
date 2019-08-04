import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import useStore, { useFuncs } from "./store";
import useMouseDrag from "./useMouseDrag";
import AddRect from "./AddRect";

import useScroll from "./useScroll";

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

function useViewbox() {
  const [state, dispatch] = useStore();
  const viewbox = state.viewbox;
  const setViewbox = update =>
    dispatch(({ viewbox }) => ({ viewbox: update(viewbox) }));
  return [viewbox, setViewbox];
}

export default function App() {
  const svgRef = useRef();

  const [{ start, end, drag }, handlers] = useMouseDrag(svgRef.current);

  const [state, dispatch] = useStore();
  const [viewbox, setViewbox] = useViewbox();

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
      console.log(element);
      dispatch(() => ({
        element
      }));
    },
    [svgRef]
  );

  useScroll(svgRef.current, setViewbox);

  const { viewBox } = useFuncs();

  //add rect to array
  const [components, setComponents] = useState([]);
  const onAdd = elm => setComponents(prev => [...prev, elm]);
  return (
    <>
      <svg viewBox={viewBox} {...handlers}>
        <LinesV />
        <LinesH />
        <text x={100} y={100}>
          hello
        </text>
      </svg>
      <svg ref={svgRef} viewBox={viewBox} {...handlers}>
        {components}
        <AddRect {...{ start, end, drag, onAdd }} />
      </svg>
    </>
  );
}
