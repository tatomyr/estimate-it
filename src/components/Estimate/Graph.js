import React from 'react'
import PropTypes from 'prop-types'
import ReactHighcharts from 'react-highcharts'

const config = {}

const Graph = ({ data }) => (
  <div>
    <ReactHighcharts
      config={{
        ...config,
        series: [{ data }],
      }}
    />
  </div>
)

Graph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
}

export default Graph
