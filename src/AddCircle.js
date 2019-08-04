import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import useStore, { useFuncs } from "./store";

export default function AddCircle({ onAdd }) {
  const [{ circle, drag }, handlers] = useCreateCircle(svgRef.current);
  useEffect(
    () => {
      if (drag) {
      } else {
      }
      if (!drag && circle && circle.r !== 0) {
        const c = (
          <circle key={JSON.stringify(circle)} {...circle} fill="lightgray" />
        );
        setComponents(prev => [...prev, c]);
      }
    },
    [drag, circle]
  );
  return <>{drag && <circle {...circle} fill="lightblue" />}</>;
}
