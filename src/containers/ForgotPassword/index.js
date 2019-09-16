import { connect } from 'react-redux'
import ForgotPasswordComponent from 'components/ForgotPassword'
import { initiateForgotPassword, resetPassword } from 'actions/ForgotPassword'

const mapStateToProps = state => ({
  forgotPassword: state.forgotPassword
})

const mapDispatchToProps = dispatch => ({
  initiateForgotPassword: (email) => dispatch(initiateForgotPassword(email)),
  resetPassword: (data) => dispatch(resetPassword(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordComponent)
