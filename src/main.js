import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "./store";
import App from "./App";
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.querySelector("#main")
);
