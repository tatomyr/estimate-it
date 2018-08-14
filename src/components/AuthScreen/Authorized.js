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
  from,
  redirectToReferrer,
  history,
}) => (
  <Fragment>
    {redirectToReferrer && <Redirect to={from} />}
    <div>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      Welcome, {username}!
    </div>
    <Button
      color="primary"
      outline
      onClick={history.goBack}
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
  from: locationType.isRequired,
  redirectToReferrer: PropTypes.bool,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
}

Authorized.defaultProps = {
  redirectToReferrer: false,
}

export default Authorized
