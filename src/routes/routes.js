import * as React from "react";
import { Route, Routes } from "react-router-dom";


import { Callback } from "../components/auth/callback";
import { Logout } from "../components/auth/logout";
import { LogoutCallback } from "../components/auth/logoutCallback";
import { PrivateRoute } from "./privateRoute";
import { SilentRenew } from "../components/auth/silentRenew";
import { PublicPage } from "../components/publicPage"
import { ActionsContainer } from "../components/actionsContainer"
import { ActionFormContainer } from "../components/actionForms/actionFormContainer";


export const UrlRoutes = (
    <Routes>
        <Route exact={true} path="/authentication/callback" element={<Callback />} />
        <Route exact={true} path="/logout" element={<Logout />} />
        <Route exact={true} path="/logout/callback" element={<LogoutCallback />} />
        <Route exact={true} path="/silentrenew" element={<SilentRenew />} />
        <Route path="/actions" element={
            <PrivateRoute>
                <ActionsContainer />
            </PrivateRoute>}
        />
        <Route path="/start-blueprint" element={
            <PrivateRoute>
                <ActionFormContainer />
            </PrivateRoute>}
        />
        <Route path="/action/:id" element={
            <PrivateRoute>
                <ActionFormContainer />
            </PrivateRoute>}
        />
        <Route path="/" element={<PublicPage />} />
    </Routes>
);