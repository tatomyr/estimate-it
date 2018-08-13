import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { locationType, matchType } from '../../helpers/propTypes'

// TODO: implement checkCreds here if !username instead of checkeng if App
const ProtectedRoute = ({
  component: Component,
  isProtected,
  username,
  match: { params: { estimateId = '' } },
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (!isProtected || username || estimateId === 'new'
      ? <Component {...props} />
      : (
        <Redirect
          to={{
            pathname: '/auth',
            state: { from: props.location, redirectAutomatically: true },
          }}
        />
      )
    )}
  />
)

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isProtected: PropTypes.bool,
  username: PropTypes.string.isRequired,
  match: matchType.isRequired,
  location: locationType.isRequired,
}

ProtectedRoute.defaultProps = {
  isProtected: false,
}

export default ProtectedRoute
