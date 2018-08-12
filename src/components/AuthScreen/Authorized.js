import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import * as api from '../../helpers/api'

const Authorized = ({
  match: { url, params },
  username,
  resetCreds,
  cleanEstimate,
  closeAuthScreen,
  redirect,
}) => (
  <Fragment>
    <div>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      Welcome, {username}!
    </div>
    <Button
      color="primary"
      outline
      onClick={url === '/auth' ? () => redirect('/') : closeAuthScreen}
    >
      Close
    </Button>
    <Button
      color="danger"
      outline
      onClick={() => {
        api.removeCreds()
        resetCreds()
        cleanEstimate(params)
      }}
    >
      Log Out
    </Button>
  </Fragment>
)

Authorized.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      estimateId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
  resetCreds: PropTypes.func.isRequired,
  cleanEstimate: PropTypes.func.isRequired,
  closeAuthScreen: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
}

export default Authorized
