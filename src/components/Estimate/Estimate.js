import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Editor from './Editor'
import Graph from './Graph'

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
      addEstimate,
    } = this.props
    const estimate = estimates[estimateId]
    if (!estimate) return null
    return (
      <Switch>
        <Route
          exact
          path="/estimate/:estimateId"
          render={() => <Editor estimate={estimate} addEstimate={addEstimate} />}
        />
        <Route
          path="/estimate/:estimateId/graph"
          render={() => <Graph data={estimate.graphData} />}
        />
      </Switch>
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
  addEstimate: PropTypes.func.isRequired,
}

export default Estimate