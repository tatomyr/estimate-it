import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import * as api from '../../helpers/api'
import { Overlay } from '../Layouts'

// TODO: implement storing username to localStorage
// TODO: implement field { lastChangedBy: username }

const AuthScreen = ({
  match: { params },
  username,
  checkCreds,
  resetCreds,
  cleanEstimate,
  closeAuthScreen,
  openGuestSession,
}) => (
  <Overlay className="auth-screen">
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
          <label htmlFor="username">Public Name</label>
          <input
            name="username"
            id="username"
            placeholder="Enter your public name…"
            required
            autoFocus // eslint-disable-line
          />
          <br />
          <label htmlFor="credentials">Access Key</label>
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
  </Overlay>
)

export default AuthScreen
