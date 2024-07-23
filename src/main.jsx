import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./redux/store.js";
import "../src/css/style.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
);
