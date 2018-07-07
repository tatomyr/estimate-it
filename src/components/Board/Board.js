import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Editor from '../Editor'
import Graph from '../Graph'

const Board = ({
  estimates,
  addEstimate,
  match: { params: { estimateId } },
}) => {
  const estimate = estimates[estimateId]
  console.log(estimateId, 'Estimate:', estimate)
  return (
    <div className="board">
      <Switch>
        <Route exact path="/estimate/:estimateId" component={Editor} />
        <Route path="/estimate/:estimateId/graph" component={Graph} />
      </Switch>
    </div>
  )
}

Board.propTypes = {
  estimates: PropTypes.objectOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  })).isRequired,
  addEstimate: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      estimateId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default Board
