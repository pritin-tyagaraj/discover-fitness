import mapStateToProps from './map-state-to-props'

const state = {
  app: {
    user: {
      isLoggedIn: true,
      firstName: 'FirstName',
      lastName: 'LastName',
      profilePictureUrl: 'profile.picture.url'
    }
  }
}

describe('screens > dashboard > map-state-to-props', () => {
  it('should behave OK', () => {
    expect(mapStateToProps(state)).toMatchSnapshot()
  })
})
