import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

const Redirector = ({ redirector: { href } }) => href && (
  <Redirect to={href} />
)

Redirector.propTypes = {
  redirector: PropTypes.shape({
    href: PropTypes.string.isRequired,
  }).isRequired,
}

export default Redirector
