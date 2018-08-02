import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

const Redirector = ({ href }) => href && (
  <Redirect to={href} />
)

Redirector.propTypes = {
  href: PropTypes.string.isRequired,
}

export default Redirector
