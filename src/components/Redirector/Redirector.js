import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

const Redirector = ({ pathToRedirect }) => pathToRedirect && (
  <Redirect to={pathToRedirect} />
)

Redirector.propTypes = {
  pathToRedirect: PropTypes.string.isRequired,
}

export default Redirector
