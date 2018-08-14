import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { locationType } from '../../helpers/propTypes'

const ProtectedRoute = ({
  component: Component,
  isProtected,
  username,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (isProtected && !username
      ? (
        <Redirect
          to={{
            pathname: '/auth',
            state: { from: props.location, redirectToReferrer: true },
          }}
        />
      )
      : <Component {...props} />
    )}
  />
)

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isProtected: PropTypes.bool,
  username: PropTypes.string.isRequired,
  location: locationType.isRequired,
}

ProtectedRoute.defaultProps = {
  isProtected: false,
}

export default ProtectedRoute
