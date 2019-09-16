import { connect } from 'react-redux'
import { resetAuthState } from 'actions/Auth'
import Layout from 'common/Layout'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  resetAuthState: () => dispatch(resetAuthState())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout)
