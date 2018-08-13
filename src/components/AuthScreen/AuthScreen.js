import React from 'react'
import Header from '../Header'
import Authorized from './Authorized'
import Anonymous from './Anonymous'
import CredsCheckingScreen from './CredsCheckingScreen'
import { locationType, credsType } from '../../helpers/propTypes'

const AuthScreen = ({
  creds: {
    haveBeenChecked,
    username,
  },
  location: { state },
  ...rest
}) => (
  <div className="overlay auth-screen">
    <Header />
    <div className="panel">
      {(!haveBeenChecked && <CredsCheckingScreen />)
        || (username && (
          <Authorized
            username={username}
            from={state ? state.from : '/'}
            redirectAutomatically={state && state.redirectAutomatically}
            {...rest}
          />))
        || <Anonymous from={state ? state.from : '/'} {...rest} />}
    </div>
  </div>
)

AuthScreen.propTypes = {
  creds: credsType.isRequired,
  location: locationType.isRequired,
}

export default AuthScreen
