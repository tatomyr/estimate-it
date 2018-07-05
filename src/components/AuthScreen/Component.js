import React from 'react'
import PropTypes from 'prop-types'

class AuthScreen extends React.Component {
  componentWillMount() {
    const { match: { params }, hasKey, checkCreds, saveCreds, getEstimate } = this.props
    checkCreds(params)
  }

  componentWillReceiveProps(newProps) {
    const { match: { params }, hasKey, checkCreds, saveCreds, getEstimate } = newProps
    if (hasKey) getEstimate(params)
  }

  render() {
    const { match: { params }, hasKey, checkCreds, saveCreds, getEstimate } = this.props
    return (
      <div className={`auth-screen overlay ${hasKey ? 'hidden' : ''}`}>
        <form
          onSubmit={e => {
            e.preventDefault()
            saveCreds(e.target.apiKey.value, params)
          }}
        >
          <input
            type="password"
            name="apiKey"
            placeholder="Enter access key..."
          />
        </form>
      </div>
    )
  }
}

export default AuthScreen
