import { AuthSession } from 'expo'
import config from '../../config'

export const startLoginFlow = async () => {
  let redirectUrl = AuthSession.getRedirectUrl()
  let result = await AuthSession.startAsync({
    authUrl:
      `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
      `&client_id=${config.facebookAppId}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&scope=public_profile,email`
  })

  const {
    params: {
      access_token: accessToken
    }
  } = result

  return accessToken
}
