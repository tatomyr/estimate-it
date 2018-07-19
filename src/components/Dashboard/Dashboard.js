// TODO: implement dashboard
// FIXME: don't show sidebar alongside Dashboard

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

export default Dashboard
