// TODO: implement dashboard

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Panel } from '../Layouts'

const Dashboard = ({
  estimates,
}) => (
  <Panel>
    <ul>
      {Object.values(estimates).map(({ project, _id }) => (
        <li key={_id}>
          <Link to={`/estimate/${_id}`}>
            {project || _id}
          </Link>
        </li>
      ))}
    </ul>
  </Panel>
)

Dashboard.propTypes = {
  estimates: PropTypes.objectOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
}

export default Dashboard
