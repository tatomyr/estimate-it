import React from 'react'
import PropTypes from 'prop-types'
import Editor from './Editor'
import Graph from './Graph'
import Sidebar from '../Sidebar'
import { matchType, estimateType } from '../../helpers/propTypes'

class Estimate extends React.Component {
  componentDidMount = () => {
    this.fetchHelper()
  }

  componentDidUpdate = () => {
    this.fetchHelper()
    // Checking for unsaved estimates
    const { estimates } = this.props
    const thereIsUnsavedEstimate = Object
      .values(estimates)
      .some(({ saved }) => !saved)
    // Setting up hook to prevent of accidental window closing/refreshing
    // FIXME: after clearing all estimates this doesn't change
    window.onbeforeunload = thereIsUnsavedEstimate
      ? () => true
      : null
  }

  fetchHelper = () => {
    const {
      getEstimate,
      match: { params: { estimateId = 'new' } },
      estimates,
    } = this.props
    // Fetching an appropriate estimate if such doesn't exist
    const estimate = estimates[estimateId]
    const estimateIsntLoaded = !estimate || estimate.text === undefined
    if (estimateIsntLoaded) {
      getEstimate({ estimateId })
    }
  }

  render = () => {
    const {
      match: { params: { estimateId = 'new' } },
      estimates,
      updateEstimate,
      graphView,
      enlargeGraph,
    } = this.props
    const estimate = estimates[estimateId]
    if (!estimate) return null
    return (
      <div className="estimate">
        <Sidebar />
        <div className="board">
          <Editor estimate={estimate} updateEstimate={updateEstimate} />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            role="button"
            onClick={enlargeGraph}
            className={`graph-wrapper ${graphView}`}
            tabIndex={0}
          >
            <Graph data={estimate.graphData} graphView={graphView} />
          </div>
        </div>
      </div>
    )
  }
}

Estimate.propTypes = {
  match: matchType.isRequired,
  estimates: PropTypes.objectOf(estimateType).isRequired,
  getEstimate: PropTypes.func.isRequired,
  updateEstimate: PropTypes.func.isRequired,
  graphView: PropTypes.string.isRequired,
  enlargeGraph: PropTypes.func.isRequired,
}

export default Estimate
