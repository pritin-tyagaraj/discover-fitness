import mapDispatchToProps from './map-dispatch-to-props'
import * as actions from './actions'

jest.mock('../../utils/social-auth', () => ({
  startLoginFlow: () => 'FB ACCESS TOKEN'
}))
jest.mock('./actions', () => ({
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

      expect(actions.login).toBeCalledWith('FB ACCESS TOKEN')
    })
    it('dispatches the `login` action', async () => {
      await mapDispatchToProps(dispatch).triggerLogin()

      expect(dispatch).toBeCalledWith('loginAction')
    })
  })
})
