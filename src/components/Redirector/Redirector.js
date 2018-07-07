import React from 'react'
import { Redirect } from 'react-router-dom'

const Redirector = ({ pathToRedirect }) => pathToRedirect && (
  <Redirect
    to={pathToRedirect}
    // TODO: consider removing push
    push
  />
)

export default Redirector
