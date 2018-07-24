import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FA from 'react-fontawesome'
import { Button } from 'reactstrap'

export const SideButton = ({
  title,
  name,
  color,
  onClick,
  link,
}) => (
  <div className="side-button">
    {link ? (
      <Link to={link}>
        <Button
          outline
          color={color}
        >
          <FA name={name} />
        </Button>
      </Link>
    ) : (
      <Button
        outline
        color={color}
        onClick={onClick}
      >
        <FA name={name} />
      </Button>
    )}
    <div className={`title text-color-${color}`}>
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
}

SideButton.defaultProps = {
  color: 'primary',
  onClick: undefined,
  link: undefined,
}

export default SideButton
