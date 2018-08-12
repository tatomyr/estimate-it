import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header'
import Authorized from './Authorized'
import Anonymous from './Anonymous'
import { locationType } from '../Redirector/Redirector'

const AuthScreen = ({
  username,
  checkingCreds,
  location: { state },
  ...rest
}) => (
  <div className="overlay auth-screen">
    <Header />
    <div className="panel">
      {(checkingCreds && 'Checking permissions. Please wait…') || (username && (
        <Authorized
          username={username}
          from={state ? state.from : '/'}
          redirectAutomatically={state && state.redirectAutomatically}
          {...rest}
        />)
      ) || <Anonymous from={state ? state.from : '/'} {...rest} />}
    </div>
  </div>
)

AuthScreen.propTypes = {
  username: PropTypes.string.isRequired,
  checkingCreds: PropTypes.bool.isRequired,
  location: locationType.isRequired,
}

export default AuthScreen
