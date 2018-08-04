import mapDispatchToProps from './map-dispatch-to-props'
import * as appActions from '../../app/actions'

jest.mock('../../helpers/social-auth', () => ({
  startLoginFlow: () => 'FB ACCESS TOKEN'
}))
jest.mock('../../app/actions', () => ({
  login: jest.fn().mockReturnValue('loginAction')
}))

let dispatch

describe('screens > dashboard > map-dispatch-to-props', () => {
  beforeEach(() => {
    dispatch = jest.fn()
  })
  describe('#triggerLogin', () => {
    it('calls the `login` action creator with the access token', async () => {
      await mapDispatchToProps(dispatch).triggerLogin()

      expect(appActions.login).toBeCalledWith('FB ACCESS TOKEN')
    })
    it('dispatches the `login` action', async () => {
      await mapDispatchToProps(dispatch).triggerLogin()

      expect(dispatch).toBeCalledWith('loginAction')
    })
  })
})
