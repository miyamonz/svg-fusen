import React, { useEffect } from "react";
import { useCreateRect } from "./useCreateShape";
import Rect from "./Rect";

export default function AddRect({ start, end, drag, onAdd }) {
  const rect = useCreateRect({ start, end, drag });
  useEffect(
    () => {
      const isValidRect = rect && rect.width * rect.height !== 0;
      if (!drag && isValidRect) {
        const c = <Rect key={JSON.stringify(rect)} {...rect} />;
        onAdd(c);
      }
    },
    [drag]
  );
  return <>{drag && <rect {...rect} fill="red" />}</>;
}
