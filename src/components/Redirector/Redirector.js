import React from 'react'
import { Redirect } from 'react-router-dom'

const Redirector = ({ pathToRedirect }) => pathToRedirect !== null
  && <Redirect to={pathToRedirect} />

export default Redirector
