import React from 'react'
import PropTypes from 'prop-types'
import Editor from './Editor'
import Graph from './Graph'
import Sidebar from '../Sidebar'
import { estimateType } from './propTypes'

class Estimate extends React.Component {
  componentDidMount = () => {
    this.fetchHelper()
  }

  componentDidUpdate = () => {
    this.fetchHelper()
    // Checking for unsaved estimates
    const { estimates, showUnsaved } = this.props
    const unsavedEstimates = Object
      .values(estimates)
      .filter(({ saved }) => !saved)
      .map(({ _id, project }) => (project || _id))
    // Setting up hook to prevent of accidental window closing/refreshing
    window.onbeforeunload = unsavedEstimates.length ? () => {
      showUnsaved(unsavedEstimates)
      return true
    } : null
  }

  fetchHelper = () => {
    const {
      getEstimate,
      match: { params: { estimateId } },
      estimates,
    } = this.props
    // Fetching an appropriate estimate on route change.
    const estimate = estimates[estimateId]
    const estimateIsntLoaded = !estimate || estimate.text === undefined
    if (estimateIsntLoaded) {
      getEstimate({ estimateId })
    }
  }

  render = () => {
    const {
      match: { params: { estimateId } },
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      estimateId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  estimates: PropTypes.objectOf(estimateType).isRequired,
  getEstimate: PropTypes.func.isRequired,
  updateEstimate: PropTypes.func.isRequired,
  graphView: PropTypes.string.isRequired,
  enlargeGraph: PropTypes.func.isRequired,
  showUnsaved: PropTypes.func.isRequired,
}

export default Estimate
