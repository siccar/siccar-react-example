import React from "react";
import { AuthConsumer } from "../providers/authProvider";

export const PrivateRoute = ({ children }) => {
    const renderFn = (Component) => (props) => (
        <AuthConsumer>
            {({ isAuthenticated, signinRedirect }) => {
                if (!!Component && isAuthenticated()) {
                    return Component;
                } else {
                    signinRedirect();
                    return <span>loading...</span>;
                }
            }}
        </AuthConsumer>
    );

    return renderFn(children)();
};