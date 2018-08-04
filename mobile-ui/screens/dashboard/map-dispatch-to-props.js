import * as appActions from '../../app/actions'
import { startLoginFlow } from '../../helpers/social-auth'

const mapDispatchToProps = (dispatch) => ({
  triggerLogin: async () => {
    const facebookAccessToken = await startLoginFlow()
    dispatch(appActions.login(facebookAccessToken))
  }
})

export default mapDispatchToProps
