import * as selectors from './selectors'

const state = {
  app: {
    user: {
      isLoggedIn: true,
      firstName: 'FirstName',
      profilePictureUrl: 'profile.picture.url'
    }
  }
}

describe('switchreens > dashboard > selectors', () => {
  describe('#isUsedLoggedIn', () => {
    it('should behave OK', () => {
      expect(selectors.isUserLoggedIn(state)).toBe(true)
    })
  })
  describe('#getCurrentUserDisplayName', () => {
    it('should behave OK', () => {
      expect(selectors.getCurrentUserDisplayName(state)).toBe('FirstName')
    })
  })
  describe('#getCurrentUserProfilePictureUrl', () => {
    it('should behave OK', () => {
      expect(selectors.getCurrentUserProfilePictureUrl(state)).toBe('profile.picture.url')
    })
  })
})
