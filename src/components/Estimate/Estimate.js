import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Editor from './Editor'
import Graph from './Graph'
import Sidebar from '../Sidebar'
import { estimateType } from './propTypes'

class Estimate extends React.Component {
  componentDidMount = () => {
    this.fetchHelper()
  }

  componentDidUpdate = prevProps => {
    this.fetchHelper(prevProps)
  }

  fetchHelper = prevProps => {
    // FIXME: investigate bug when we try to pass by the route of a deleted estimate OR ...
    // FIXME: ... OR to save with ID of deleted estimate
    const {
      getEstimate,
      match: { params: { estimateId } },
      estimates,
    } = this.props
    // Fetch an appropriate estimate on route change. FIXME: do we still need this statement?
    const routeHasBeenChanged = prevProps && prevProps.match.params.estimateId !== estimateId
    const estimateIsntLoaded = estimates[estimateId].text === undefined
    console.log(prevProps, '?', routeHasBeenChanged, '&&', estimateIsntLoaded)
    // FIXME:
    if (/*routeHasBeenChanged &&*/ estimateIsntLoaded) {
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
  estimates: PropTypes.objectOf(estimateType).isRequired,
  getEstimate: PropTypes.func.isRequired,
  updateEstimate: PropTypes.func.isRequired,
}

export default Estimate
