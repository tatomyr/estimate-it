import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
// FIXME: refactor routing
import { Switch, Route, Link } from 'react-router-dom'
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
    const {
      getEstimate,
      match: { params: { estimateId } },
      estimates,
    } = this.props
    // Fetch an appropriate estimate on route change. FIXME: do we still need this statement?
    const routeHasBeenChanged = prevProps && prevProps.match.params.estimateId !== estimateId
    const estimate = estimates[estimateId]
    const estimateIsntLoaded = !estimate || estimate.text === undefined
    console.log(prevProps, '?', routeHasBeenChanged, '&&', estimateIsntLoaded)
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
          <Switch>
            <Route
              exact
              path="/estimate/:estimateId"
              render={() => (
                <Fragment>
                  <Editor estimate={estimate} updateEstimate={updateEstimate} />
                  <div onClick={enlargeGraph} className={`graph-wrapper ${graphView}`}>
                    <Graph data={estimate.graphData} graphView={graphView} />
                  </div>
                </Fragment>
              )}
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
  graphView: PropTypes.string.isRequired,
  enlargeGraph: PropTypes.func.isRequired,
}

export default Estimate
