import { connect } from 'react-redux'

import Home from 'components/Home'

const mapStateToProps = state => ({
  home: state.home
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
