import React from 'react'
import PropTypes from 'prop-types'
import spinner from './spinner.gif'
import { Overlay } from '../Layouts'

const Spinner = ({ showSpinner }) => (
  <Overlay className={`spinner ${showSpinner ? '' : 'hidden'}`}>
    <img src={spinner} alt="" />
  </Overlay>
)

Spinner.propTypes = {
  showSpinner: PropTypes.bool,
}
Spinner.defaultProps = {
  showSpinner: false,
}

export default Spinner
