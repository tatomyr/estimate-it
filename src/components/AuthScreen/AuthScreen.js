import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as api from '../../helpers/api'

const AuthScreen = ({
  match: { params },
  username,
  checkCreds,
  resetCreds,
  cleanEstimate,
  closeAuthScreen,
  openGuestSession,
}) => (
  <div className="overlay auth-screen">
    {username ? (
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
      <Fragment>
        <form
          onSubmit={e => {
            e.preventDefault()
            const [dbName, apiKey] = e.target.credentials.value.split(':')
            api.setCreds({ dbName, apiKey, username: e.target.username.value })
            checkCreds()
          }}
        >
          <label htmlFor="username">
            Public Name
          </label>
          <input
            name="username"
            id="username"
            placeholder="Enter your public name…"
            required
            autoFocus // eslint-disable-line
          />
          <br />
          <label htmlFor="credentials">
            Access Key
          </label>
          <input
            type="password"
            name="credentials"
            id="credentials"
            placeholder="Enter access key…"
            required
          />
          <br />
          <button type="submit">
            Sign In
          </button>
        </form>
        Or
        <br />
        <button
          type="button"
          onClick={openGuestSession}
        >
          Guest Session
        </button>
      </Fragment>
    )}
  </div>
)

AuthScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      estimateId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
  checkCreds: PropTypes.func.isRequired,
  resetCreds: PropTypes.func.isRequired,
  cleanEstimate: PropTypes.func.isRequired,
  closeAuthScreen: PropTypes.func.isRequired,
  openGuestSession: PropTypes.func.isRequired,
}

export default AuthScreen
