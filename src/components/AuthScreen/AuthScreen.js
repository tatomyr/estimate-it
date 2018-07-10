import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as api from '../../helpers/api'

// TODO: implement storing username to localStorage
// TODO: implement field { lastChangedBy: username }

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
          /* eslint-disable-next-line no-shadow */
          const [dbName, apiKey] = e.target.credentials.value.split(':')
          api.setCreds({ dbName, apiKey })
          checkCreds()
        }}
      >
        <input
          type="password"
          name="credentials"
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
            api.removeCreds()
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
