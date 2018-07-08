import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as api from '../../helpers/api'

const AuthScreen = ({
  match: { params },
  apiKey,
  checkCreds,
  resetCreds,
  cleanEstimate,
  closeAuthScreen,
  openGuestSession,
}) => (
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
          autoFocus // eslint-disable-line
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

export default AuthScreen
