import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Editor from './Editor'
import Graph from './Graph'
import Sidebar from '../Sidebar'

class Estimate extends React.Component {
  componentDidMount = () => {
    const {
      match: { params },
      getEstimate,
    } = this.props
    getEstimate(params)
  }

  componentDidUpdate = prevProps => {
    const { getEstimate, match: { params: { estimateId } } } = this.props
    // Fetch an appropriate estimate on route change
    if (prevProps.match.params.estimateId !== estimateId) {
      getEstimate({ estimateId })
    }
  }

  render = () => {
    const {
      match: { params: { estimateId } },
      estimates,
      updateEstimate,
    } = this.props
    const estimate = estimates[estimateId]
    if (!estimate) return null
    return (
      <div className="estimate">
        <Sidebar />
        <div className="board">
          <Switch>
            <Route
              exact
              path="/estimate/:estimateId"
              render={() => <Editor estimate={estimate} updateEstimate={updateEstimate} />}
            />
            <Route
              path="/estimate/:estimateId/graph"
              render={() => <Graph data={estimate.graphData} />}
            />
          </Switch>
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
  estimates: PropTypes.objectOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  getEstimate: PropTypes.func.isRequired,
  updateEstimate: PropTypes.func.isRequired,
}

export default Estimate
