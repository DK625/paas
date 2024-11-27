import { createAuth0 } from '@auth0/auth0-vue'

export const auth0 = createAuth0({
  domain: 'dev-u67s63gaoytg80ad.us.auth0.com',
  clientId: 'HaqXdBt1p8q5o0Rez3PAU2gr4bX8h6pV',
  authorizationParams: {
    redirect_uri: 'http://localhost:9000/callback',
    audience: 'http://localhost:8000/api'
  }
})
