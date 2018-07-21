// TODO: implement delete project

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Panel } from '../Layouts'

class Dashboard extends React.Component {
  componentDidMount = () => {
    this.props.fetchTitles()
  }

  render = () => (
    <Panel>
      <ul>
        {Object.values(this.props.estimates).map(({
          project,
          _id,
          _changed,
          modifiedBy,
        }) => (
          <li key={_id}>
            <Link to={`/estimate/${_id}`}>
              <b>
                {project || _id}
              </b>
              <small>
                {_id !== 'new' && ` ${moment(_changed).toNow()} by ${modifiedBy}`}
              </small>
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

Dashboard.propTypes = {
  estimates: PropTypes.objectOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    _changed: PropTypes.string.isRequired,
    modifiedBy: PropTypes.string.isRequired,
  })).isRequired,
  fetchTitles: PropTypes.func.isRequired,
}

export default Dashboard
