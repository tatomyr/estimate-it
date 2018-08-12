import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import AuthScreen from '../AuthScreen'

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
      : <AuthScreen />
      // TODO: implement redirection
      // : (
      //   <Redirect
      //     to={{
      //       pathname: '/auth',
      //       state: { from: props.location },
      //     }}
      //   />
      // )
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
}

export default ProtectedRoute
