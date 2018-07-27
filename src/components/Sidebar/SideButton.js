import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import FA from 'react-fontawesome'
import { Button } from 'reactstrap'

const SideButton = ({
  title,
  name,
  color,
  onClick,
  link,
  disabled,
}) => (
  <div className="side-button">
    {!disabled && link ? (
      <NavLink to={link} exact>
        <Button
          outline
          color={disabled ? 'secondary' : color}
          disabled={disabled}
        >
          <FA name={name} />
        </Button>
      </NavLink>
    ) : (
      <Button
        outline
        color={disabled ? 'secondary' : color}
        onClick={onClick}
        disabled={disabled}
      >
        <FA name={name} />
      </Button>
    )}
    <div className={`title text-color-${disabled ? 'secondary' : color}`}>
      {title}
    </div>
  </div>
)

SideButton.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
  link: PropTypes.string,
  disabled: PropTypes.bool,
}

SideButton.defaultProps = {
  color: 'primary',
  onClick: undefined,
  link: undefined,
  disabled: false,
}

export default SideButton
