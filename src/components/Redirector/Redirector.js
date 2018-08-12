import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

const Redirector = ({ redirector: { location } }) => location && (
  <Redirect to={location} />
)

export const locationType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.any,
  }),
])

Redirector.propTypes = {
  redirector: PropTypes.shape({
    location: locationType,
  }).isRequired,
}

export default Redirector
