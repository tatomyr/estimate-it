import React from 'react'
import PropTypes from 'prop-types'
import shallowDiff from '../../helpers/json-diff'
import AuthScreen from './AuthScreen'

class Register extends React.Component {
  componentDidMount() {
    const { checkCreds } = this.props
    console.log('did mount')
    checkCreds()
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: { estimateId } },
      apiKey,
      getEstimate,
    } = this.props
    console.log('did update', shallowDiff(prevProps)(this.props), '->', shallowDiff(this.props)(prevProps))

    if (estimateId && (
      apiKey !== prevProps.apiKey
      || estimateId !== prevProps.match.params.estimateId
    )) {
      getEstimate({ estimateId })
    }
  }

  render() {
    const { showAuthScreen } = this.props
    console.log('render/showAuthScreen', showAuthScreen)

    return showAuthScreen && (
      <AuthScreen
        {...this.props}
      />
    )
  }
}

Register.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      estimateId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  checkCreds: PropTypes.func.isRequired,
  getEstimate: PropTypes.func.isRequired,
  apiKey: PropTypes.string,
  showAuthScreen: PropTypes.bool.isRequired,
}

Register.defaultProps = {
  apiKey: '',
}

export default Register
