import React from 'react'
import PropTypes from 'prop-types'
import ReactHighcharts from 'react-highcharts'

const config = {}

const Graph = ({
  reducedGraphData,
}) => (
  <div>
    <ReactHighcharts
      config={{
        ...config,
        series: [{ data: reducedGraphData }],
      }}
    />
  </div>
)

const dataType = PropTypes.arrayOf(PropTypes.number)
Graph.propTypes = {
  reducedGraphData: PropTypes.arrayOf(dataType).isRequired,
}

export default Graph
