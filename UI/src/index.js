import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import reducers from "./reducers";
import { BrowserRouter, Route } from "react-router-dom";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route path="/" component={App} />
    </Provider>
    {/* <App /> */}
  </BrowserRouter>,
  document.getElementById("root")
);