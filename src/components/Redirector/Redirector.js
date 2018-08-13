import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { locationType } from '../../helpers/propTypes'

const Redirector = ({ redirector: { location } }) => location && (
  <Redirect to={location} />
)

Redirector.propTypes = {
  redirector: PropTypes.shape({
    location: locationType,
  }).isRequired,
}

export default Redirector
