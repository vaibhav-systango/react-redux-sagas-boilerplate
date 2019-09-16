import { connect } from 'react-redux'
import AuthComponent from 'components/Auth'
import { login, signup } from 'actions/Auth'

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(login(data)),
  signup: (data) => dispatch(signup(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthComponent)
