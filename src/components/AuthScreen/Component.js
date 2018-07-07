import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as api from '../../helpers/api'
import shallowDiff from '../../helpers/json-diff'

class AuthScreen extends React.Component {
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

    if (apiKey !== prevProps.apiKey || estimateId !== prevProps.match.params.estimateId) {
      getEstimate({ estimateId })
    }
  }

  render() {
    const {
      match: { params },
      apiKey,
      checkCreds,
      resetCreds,
      cleanEstimate,
      showAuthScreen,
      closeAuthScreen,
      openGuestSession,
    } = this.props
    console.log('render/showAuthScreen', showAuthScreen)

    return showAuthScreen && (
      <div className="auth-screen overlay">
        {!apiKey && (
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
              required
              autoFocus
            />
            <br />
            <button type="submit">
              Submit Key
            </button>
          </form>
        )}
        {apiKey ? (
          <Fragment>
            <button
              type="button"
              onClick={closeAuthScreen}
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                api.removeApiKey()
                resetCreds()
                cleanEstimate(params)
              }}
            >
              Log Out
            </button>
          </Fragment>
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
