const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN

// redirect path
export const AUTH_REDIRECT_PATH = '/auth/redirect'

// Credentials for Auth0 app
export const auth0Config = {
  domain: AUTH0_DOMAIN,
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirect_uri: `${window.location.origin}${AUTH_REDIRECT_PATH}`,
}

// Auth0 API Management
const API_ENDPOINT = `https://${AUTH0_DOMAIN}/api/v2/`

export const getTokenUrl = () => `https://${AUTH0_DOMAIN}/oauth/token`

export const getUserUrl = uid => `${API_ENDPOINT}users/${uid}`

export const auth0ApiBody = {
  client_id: process.env.REACT_APP_AUTH0_API_CLIENT_ID,
  client_secret: process.env.REACT_APP_AUTH0_API_CLIENT_SECRET,
  audience: API_ENDPOINT,
  grant_type: 'client_credentials',
}
