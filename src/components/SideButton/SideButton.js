import React from 'react'
import PropTypes from 'prop-types'
import FA from 'react-fontawesome'
import { Button } from 'reactstrap'
import { locationType } from '../../helpers/propTypes'

const SideButton = ({
  title,
  name,
  color,
  onClick,
  link,
  disabled,
  redirect,
}) => (
  <div
    className="side-button"
    data-title={title}
    data-color={disabled ? 'secondary' : color}
  >
    <Button
      outline
      color={disabled ? 'secondary' : color}
      onClick={onClick || (() => redirect(link))}
      disabled={disabled}
    >
      <FA name={name} />
    </Button>
  </div>
)

SideButton.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  link: locationType,
  disabled: PropTypes.bool,
  redirect: PropTypes.func.isRequired,
}

SideButton.defaultProps = {
  color: 'primary',
  onClick: undefined,
  link: '',
  disabled: false,
}

export default SideButton
