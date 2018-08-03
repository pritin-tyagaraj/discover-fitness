import { connect } from 'react-redux'
import Component from './components/Dashboard'
import mapStateToProps from './map-state-to-props'
import mapDispatchToProps from './map-dispatch-to-props'

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)

export default Dashboard
