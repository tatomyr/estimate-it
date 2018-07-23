import React from 'react'
import PropTypes from 'prop-types'
import { SideButton } from './SideButton'

const Sidebar = ({
  match: { params: { estimateId } },
  recalc,
  saveEstimate,
  openAuthScreen,
  saved,
}) => (
  <aside>
    <SideButton
      title="Calculate"
      name="rocket"
      onClick={() => recalc(estimateId)}
    />
    <SideButton
      title="Erase"
      name="eraser"
      color="danger"
    />
    <SideButton
      title="Save"
      name="save"
      color={saved ? 'secondary' : 'primary'}
      onClick={() => saveEstimate({ estimateId })}
    />
    <SideButton
      title="New"
      name="file"
      link="/estimate/new"
    />
    <SideButton
      title="Auth"
      name="key"
      onClick={openAuthScreen}
    />
    <SideButton
      title="Editor"
      name="edit"
      link={`/estimate/${estimateId}`}
    />
    <SideButton
      title="Chart"
      name="signal"
      link={`/estimate/${estimateId}/graph`}
    />
    <SideButton
      title="Dashboard"
      name="list-ul"
      link="/dashboard"
    />
    <SideButton
      title="Home"
      name="home"
      link="/"
    />
  </aside>
)

Sidebar.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      estimateId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  recalc: PropTypes.func.isRequired,
  saveEstimate: PropTypes.func.isRequired,
  openAuthScreen: PropTypes.func.isRequired,
}

export default Sidebar
