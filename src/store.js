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
