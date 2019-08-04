import React, { useReducer, useContext } from "react";

const initialState = {
  viewbox: { x: 0, y: 0, width: 0, height: 0 },
  element: { x: 0, y: 0, width: 0, height: 0 }
};
const Store = React.createContext();

//ここにreducer
const reducer = (state = {}, action) => {
  if (typeof action === "function") {
    return { ...state, ...action(state) };
  }
  return state;
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};

export { Store, Provider };
export default () => useContext(Store);

export function useFuncs() {
  const [state, dispatch] = useContext(Store);
  const { viewbox, element } = state;

  const eventToPos = e => {
    const ox = e.nativeEvent.offsetX;
    const oy = e.nativeEvent.offsetY;

    const x = (ox / element.width) * viewbox.width + viewbox.x;
    const y = (oy / element.height) * viewbox.height + viewbox.y;
    return { x, y };
  };

  const viewBox = `${viewbox.x} ${viewbox.y} ${viewbox.width} ${
    viewbox.height
  }`;
  return { eventToPos, viewBox };
}
