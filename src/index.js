import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import "./i18n/i18n";
import { Provider } from "react-redux";
import configureStore from "data/store";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
