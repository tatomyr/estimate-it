import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { locationType } from '../Redirector/Redirector'

// TODO: implement checkCreds here if !username instead of checkeng if App
const ProtectedRoute = ({
  component: Component,
  username,
  match: { params: { estimateId = '' } },
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (username || estimateId === 'new'
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
  username: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      estimateId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: locationType.isRequired,
}

export default ProtectedRoute
