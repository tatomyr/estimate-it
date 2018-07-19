import React from 'react'
import PropTypes from 'prop-types'
import ReactHighcharts from 'react-highcharts'

const config = {}

const Graph = ({ data }) => (
  <ReactHighcharts
    config={{
      ...config,
      series: [{ data }],
    }}
  />
)

Graph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
}

export default Graph
