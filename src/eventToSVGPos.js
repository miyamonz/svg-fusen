import React, { createContext, useContext } from "react";

const Store = createContext();
export const Provider = ({ children, viewbox, target }) => {
  const fn = e => {
    const ox = e.nativeEvent.offsetX;
    const oy = e.nativeEvent.offsetY;

    const x = (ox / target.clientWidth) * viewbox.width + viewbox.x;
    const y = (oy / target.clientHeight) * viewbox.height + viewbox.y;
    return { x, y };
  };
  return <Store.Provider value={fn}>{children}</Store.Provider>;
};

export function useEventToPos() {
  return useContext(Store);
}
