import React, { Component } from "react";
import { AuthProvider } from "./providers/authProvider";
import { BrowserRouter } from "react-router-dom";
import { UrlRoutes } from "./routes/routes";

export default class App extends Component {
  render() {
      return (
          <AuthProvider>
              <BrowserRouter children={UrlRoutes} basename={"/"} />
          </AuthProvider>
      );
  }
}
