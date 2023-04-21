import {Auth0Provider} from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import "./index.css";
import {store} from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain='dev-jh65veyupniu4vjx.us.auth0.com'
    clientId='5U4IOqP4MRbMUAG33dYoO7oUjWlVmHYL'
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Auth0Provider>
);
