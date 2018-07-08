import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthScreen from './Register/AuthScreen'

const PrivateRoute = ({ component: Component, apiKey, ...rest }) => (
  <Route
    // {...rest}
    render={props => (
      apiKey === true
        ? <Component {...props} />
        : <AuthScreen />
    )}
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  apiKey: PropTypes.string.isRequired,
}

const mapStateToProps = ({ apiKey: { apiKey } }) => ({
  apiKey,
})

export default connect(mapStateToProps, null)(PrivateRoute)
