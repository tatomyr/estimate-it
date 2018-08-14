import React from 'react'
import PropTypes from 'prop-types'
import SideButton from '../SideButton'
import { matchType, estimateType } from '../../helpers/propTypes'

const Sidebar = ({
  match: { params: { estimateId = 'new' } },
  recalc,
  saveEstimate,
  estimates,
  username,
  graphView,
  minifyGraph,
  enlargeGraph,
}) => {
  const { saved, calculated } = estimates[estimateId]
  return (
    <aside>
      <SideButton
        title="New"
        name="file"
        disabled={estimateId === 'new'}
        link="/estimate/new"
      />
      <SideButton
        title="Erase"
        name="eraser"
        color="danger"
      />
      <SideButton
        title="Calculate"
        name="rocket"
        disabled={calculated}
        onClick={() => !calculated && recalc(estimateId)}
      />
      <SideButton
        title="Save"
        name="save"
        disabled={!username || saved}
        color={(saved && 'secondary') || (username && calculated && 'primary') || 'warning'}
        onClick={() => !saved && saveEstimate({ estimateId })}
      />
      {graphView === 'minified' ? (
        <SideButton
          title="Graph"
          name="bar-chart"
          onClick={enlargeGraph}
        />
      ) : (
        <SideButton
          title="Editor"
          name="edit"
          onClick={minifyGraph}
        />
      )}
      <SideButton
        title="Dashboard"
        name="list-ul"
        link="/dashboard"
      />
      <div className="sidebar-padding" />
      <SideButton
        title="Auth"
        name={username ? 'unlock' : 'lock'}
        color={username ? 'success' : 'warning'}
        link="/auth"
      />
      <SideButton
        title="Home"
        name="home"
        link="/"
      />
    </aside>
  )
}

Sidebar.propTypes = {
  match: matchType.isRequired,
  recalc: PropTypes.func.isRequired,
  saveEstimate: PropTypes.func.isRequired,
  estimates: PropTypes.objectOf(estimateType).isRequired,
  username: PropTypes.string.isRequired,
  graphView: PropTypes.string.isRequired,
  minifyGraph: PropTypes.func.isRequired,
  enlargeGraph: PropTypes.func.isRequired,
}

export default Sidebar
