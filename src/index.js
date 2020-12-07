import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
require('dotenv').config();
ReactDOM.render(
  <Auth0Provider
    domain="dev-m-vqmxc6.us.auth0.com"
    clientId="z4GmtvC1zJD9qBeYxUsmdn3dJdZX7K33"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
