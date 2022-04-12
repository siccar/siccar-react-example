import './App.css';
import React, { Component } from "react";
import { AuthProvider } from "./providers/authProvider";
import { BrowserRouter } from "react-router-dom";
import { UrlRoutes } from "./routes/routes";

const configuration = {
  client_id: 'interactive.public.short',
  redirect_uri: 'http://localhost:3000/authentication/callback',
  silent_redirect_uri: 'http://localhost:3000/authentication/silent-callback', // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
  scope: 'openid profile email api offline_access',
  authority: 'https://demo.identityserver.io'
};

export default class App extends Component {
  render() {
      return (
          <AuthProvider>
              <BrowserRouter children={UrlRoutes} basename={"/"} />
          </AuthProvider>
      );
  }
}
