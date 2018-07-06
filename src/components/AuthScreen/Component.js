import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as api from '../../helpers/api'

class AuthScreen extends React.Component {
  componentWillMount() {
    console.log('will mount')
    this.props.checkCreds()
  }

  componentDidMount() {
    const {
      match: { params },
      apiKey,
      checkCreds,
      saveCreds,
      getEstimate,
      showAuthScreen,
      // openGuestSession,
      openAuthScreen,
      closeAuthScreen,
      redirect,
      cleanEstimate,
    } = this.props
    console.log('did mount')

    if (params.estimateId !== 'new' && !apiKey) {
      cleanEstimate(params.estimateId)
      openAuthScreen()
    }

  }

  componentWillReceiveProps({
    match: { params },
    apiKey,
    checkCreds,
    saveCreds,
    getEstimate,
    openAuthScreen,
    closeAuthScreen,
    // changeText
    cleanEstimate,
  }) {
    console.log('will receive props', apiKey, '÷',params.estimateId)

    if (params.estimateId !== 'new' && !apiKey) {
      cleanEstimate(params.estimateId)
      openAuthScreen()
    }

    // On route change
    if (params.estimateId !== this.props.match.params.estimateId) {
      if (params.estimateId === 'new') closeAuthScreen()
    }

    if (apiKey && params.estimateId) {
      if (
        apiKey !== this.props.apiKey
        ||
        params.estimateId !== this.props.match.params.estimateId
      ) getEstimate(params)
    }
  }

  render() {
    const {
      match: { params },
      apiKey,
      checkCreds,
      saveCreds,
      getEstimate,
      showAuthScreen,
      openAuthScreen,
      closeAuthScreen,
      redirect,
      openGuestSession,
    } = this.props
    console.log('render/showAuthScreen', showAuthScreen)

    return showAuthScreen && (
      <div className="auth-screen overlay">
        <form
          onSubmit={e => {
            e.preventDefault()
            api.setApiKey(e.target.apiKey.value)
            checkCreds()
          }}
        >
          <input
            type="password"
            name="apiKey"
            placeholder="Enter access key..."
            defaultValue={apiKey}
            autoFocus
          />
          <br />
          <button type="submit">
            Submit Key
          </button>
        </form>
        {apiKey ? (
          <button
            type="button"
            onClick={closeAuthScreen}
          >
            Close
          </button>
        ) : (
          <button
            type="button"
            onClick={openGuestSession}
          >
            Guest Session
          </button>
        )}
      </div>
    )
  }
}

export default AuthScreen
