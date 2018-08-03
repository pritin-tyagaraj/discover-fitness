import * as actions from './actions'
import { startLoginFlow } from '../../utils/social-auth'

const mapDispatchToProps = (dispatch) => ({
  triggerLogin: async () => {
    const facebookAccessToken = await startLoginFlow()
    dispatch(actions.login(facebookAccessToken))
  }
})

export default mapDispatchToProps
