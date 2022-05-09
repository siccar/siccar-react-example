# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Pre-requisites

### Platform

You will need to have access to an installation of the platform and have a tenant and identity provider setup for federated login via the TenantService. Please see platform documentation for deployments and configuration.

### Identity server configuration

Client configuration must exist for the react app in identity server. It is required to allow the react app to perform a OAuth2 auth code flow for the user.

The configuration should be setup as follows.

```c#
{
  ClientId = "siccar-react-example",
  AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
  RequireClientSecret = false,
  RedirectUris = { "http://localhost:3000/authentication/callback" },
  PostLogoutRedirectUris = { "http://localhost:3000/logout-callback" },
  AllowedCorsOrigins = new List<string>{ "http://localhost:3000"},
  AllowedScopes = new List<string>
    {
        IdentityServerConstants.StandardScopes.OpenId,
        IdentityServerConstants.StandardScopes.Profile
    }
}
````

### Register

A register must already exist on the platform and your user must have access to that register.

### Environment Variables

A .env file is located in the root of this project.

```js
{
  REACT_APP_AUTH_URL = "<siccarUrl>"
  REACT_APP_PUBLIC_URL = "http://localhost:3000"
  REACT_APP_IDENTITY_CLIENT_ID = "siccar-react-example"
  REACT_APP_REDIRECT_URL = "http://localhost:3000/authentication/callback"
  REACT_APP_LOGOFF_REDIRECT_URL = "http://localhost:3000/logout-callback"
  REACT_APP_SICCAR_PUBLIC_URL = "https://localhost:8443"
  REACT_APP_SICCAR_REGISTER_ID = "40daacacf4ef407cb5c4b9b7d0e7fe36"
  REACT_APP_SICCAR_BLUEPRINT_TX_ID = "a4b66ccf2df9247d5730a7ee4e2ce4591efbd4d3bb514dcb8152fb303c7516cf"
  REACT_APP_SICCAR_WALLET_ADDRESS = "ws1jfk5jwvqvpnqr2nxaxlwq76falqymmz29q4rar3x05xkjzpqqqp2qcv08xa"
}
```

## Available Scripts

In the project directory, you can run:

### `npm install`

This will install of the required dependecies for the react app.

### `setup.ps1`

Using powershell 7.2+, execute the setup.ps1 powershell script. You will need to genereate an access token for the platform. This can be done via our postman requests.
Run the script as below pasting in the access token as below.

`./setup.ps1 -token <access token> -siccarUri <siccarUri> -registerId <registerId>`

- -token : A JWT access token supplied by the Platforms identity server. (required)
- -siccarUri : The target url of the siccar platform. Default value is "https://localhost:8443" (optional);
- -registerId : The target register id to publish the blueprint on. Default value is "40daacacf4ef407cb5c4b9b7d0e7fe36" (optional);

This will generate the wallets utilised by the blueprint and then publish the blueprint to the target register id. The output of the script is a blueprint transaction id.
This must be pasted into the .env file...

`
REACT_APP_SICCAR_BLUEPRINT_TX_ID = "<blueprint transaction id>"
`

**Note: This script must be run to successfully use this react example.**

**Note: You must be the owner, or at least a delegate, of the created wallets to be able to access them.**

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Running the demo

1. After starting the react app you will be redirected to the landing public page.
2. Navigate in the browser to <http://localhost:3000/actions>
3. Click "Start new blueprint"
4. Enter your details.
5. Setting "Go to next Action" to "No" ends the workflow immediately and setting to "Yes" will create a pending action for the next participant in the blueprint.
6. Set the action condition to "Yes".
7. Change the wallet address in the .env file to "ws1jfk5jwvqvpnqr2nxaxlwq76falqymmz29q4rar3x05xkjzpqqqp2qcv08xa" this is the wallet address for the second participant.
8. Restart the react app with the new variables.
9. Navigate in the browser to <http://localhost:3000/actions>
10. You will see a pending action.
11. Click on the action and carry out the last action.

## Troubleshooting

- "No form Exists for action". This could mean you have not copied the blueprint transaction id after running the setup script.
- The list of actions is empty. "No actions available." This is correct when first starting the app.
- The list of actions is empty after submiting the first step. You need to set the "Go to next action" field to "Yes".
- The list of actions is empty after submiting the first step. You need to set the wallet address to the wallet address of the participant in the blueprint.
