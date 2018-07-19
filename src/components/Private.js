import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthScreen from './AuthScreen'

const Private = ({
  children,
  username,
  match: { params: { estimateId = '' } },
}) => (
  <Fragment>
    {username || estimateId === 'new'
      ? children
      : <AuthScreen />}
  </Fragment>
)

Private.propTypes = {
  children: PropTypes.node.isRequired,
  username: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      estimateId: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

const mapStateToProps = ({ creds: { username } }) => ({
  username,
})

export default withRouter(connect(mapStateToProps, null)(Private))
