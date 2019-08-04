import React, { useEffect } from "react";
import { useCreateCircle } from "./useCreateShape";

export default function AddCircle({ start, end, drag, onAdd }) {
  const circle = useCreateCircle({ start, end, drag });
  useEffect(
    () => {
      if (!drag && circle && circle.r !== 0) {
        const c = (
          <circle key={JSON.stringify(circle)} {...circle} fill="lightgray" />
        );
        onAdd(c);
      }
    },
    [drag, circle]
  );
  return <>{drag && <circle {...circle} fill="lightblue" />}</>;
}
