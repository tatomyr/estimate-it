import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header'
import Authorized from './Authorized'
import Anonymous from './Anonymous'

const AuthScreen = ({
  username,
  checkingCreds,
  ...rest
}) => (
  <div className="overlay auth-screen">
    <Header />
    <div className="panel">
      {(checkingCreds && 'Checking permissions. Please wait…')
        || (username && <Authorized username={username} {...rest} />)
        || <Anonymous {...rest} />}
    </div>
  </div>
)

AuthScreen.propTypes = {
  username: PropTypes.string.isRequired,
  checkingCreds: PropTypes.bool.isRequired,
}

export default AuthScreen
