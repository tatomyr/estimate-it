import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { credsType } from '../../helpers/propTypes'

class Private extends Component {
  componentDidMount = () => {
    const {
      creds,
      checkCreds,
    } = this.props
    if (!creds.haveBeenChecked) {
      checkCreds()
    }
  }

  render = () => (
    <Fragment>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {this.props.children}
    </Fragment>
  )
}

Private.propTypes = {
  creds: credsType.isRequired,
  checkCreds: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Private
