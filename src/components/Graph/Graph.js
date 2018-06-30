import React from 'react'
import PropTypes from 'prop-types'
import ReactHighcharts from 'react-highcharts'

const config = {}

const Graph = ({ graphData }) => (
  <div>
    <ReactHighcharts
      config={{
        ...config,
        series: [{ data: graphData }],
      }}
    />
  </div>
)

const dataType = PropTypes.arrayOf(PropTypes.number)
Graph.propTypes = {
  graphData: PropTypes.arrayOf(dataType),
}
Graph.defaultProps = {
  graphData: [],
}

export default Graph
