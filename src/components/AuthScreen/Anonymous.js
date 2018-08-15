import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  Alert,
} from 'reactstrap'
import FA from 'react-fontawesome'
import * as api from '../../helpers/api'
import { locationType } from '../../helpers/propTypes'

const AlertAccessingEstimate = ({ from }) => ((from
  && from.pathname
  && from.pathname.startsWith('/estimate/')
  && from.pathname !== '/estimate/new'
)
  ? (
    <Alert color="warning">
      Please enter a valid credentials to get access to this estimate
    </Alert>
  )
  : null)

AlertAccessingEstimate.propTypes = {
  from: locationType.isRequired,
}

const Anonymous = ({
  checkCreds,
  from,
}) => (
  <Fragment>
    <AlertAccessingEstimate from={from} />
    <form
      onSubmit={e => {
        e.preventDefault()
        const [dbName, apiKey] = e.target.credentials.value.split(':')
        api.setCreds({ dbName, apiKey, username: e.target.username.value })
        checkCreds()
      }}
    >
      <label htmlFor="username">
        Public Name
      </label>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <span className="input-group-text">
            <FA name="user" />
          </span>
        </InputGroupAddon>
        <Input
          name="username"
          id="username"
          required
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
        />
      </InputGroup>
      <label htmlFor="credentials">
        Access Key
      </label>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <span className="input-group-text">
            <FA name="key" />
          </span>
        </InputGroupAddon>
        <Input
          type="password"
          name="credentials"
          id="credentials"
          required
        />
      </InputGroup>
      <Button color="primary" outline>
        Sign In
      </Button>
    </form>
    Or
    <br />
    <Link to="/estimate/new">
      <Button color="primary" outline>
        Guest Session
      </Button>
    </Link>
  </Fragment>
)

Anonymous.propTypes = {
  checkCreds: PropTypes.func.isRequired,
  from: locationType.isRequired,
}

export default Anonymous
