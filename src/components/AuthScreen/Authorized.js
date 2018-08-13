import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import * as api from '../../helpers/api'
import { locationType } from '../../helpers/propTypes'

const Authorized = ({
  username,
  resetCreds,
  cleanAllEstimates,
  redirect,
  from,
  redirectAutomatically,
}) => (
  <Fragment>
    {redirectAutomatically && <Redirect to={from} />}
    <div>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      Welcome, {username}!
    </div>
    <Button
      color="primary"
      outline
      onClick={() => redirect(from)}
    >
      Close
    </Button>
    <Button
      color="danger"
      outline
      onClick={() => {
        api.removeCreds()
        resetCreds()
        cleanAllEstimates()
      }}
    >
      Log Out
    </Button>
  </Fragment>
)

Authorized.propTypes = {
  username: PropTypes.string.isRequired,
  resetCreds: PropTypes.func.isRequired,
  cleanAllEstimates: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  from: locationType.isRequired,
  redirectAutomatically: PropTypes.bool,
}

Authorized.defaultProps = {
  redirectAutomatically: false,
}

export default Authorized
