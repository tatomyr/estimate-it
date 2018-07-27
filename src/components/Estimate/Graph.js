// TODO: configure highcharts or replace with victorycharts

import React from 'react'
import PropTypes from 'prop-types'
import ReactHighcharts from 'react-highcharts'

const config = {
  title: { text: 'Cumulative distribution function' },
  yAxis: { min: 0, max: 100 },
}

const Graph = ({ data }) => (
  <ReactHighcharts
    config={{
      ...config,
      series: [{
        name: 'Probability per time',
        step: true,
        data,
      }],
    }}
  />
)

Graph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
}

Graph.defaultProps = {
  data: [],
}

export default Graph
