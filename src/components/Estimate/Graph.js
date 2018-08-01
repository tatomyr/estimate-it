// TODO: configure highcharts or replace with victorycharts

import React from 'react'
import PropTypes from 'prop-types'
import ReactHighcharts from 'react-highcharts'

const config = ({
  minified: ({
    title: { text: null },
    yAxis: { min: 0, max: 100, title: { text: null }, labels: { enabled: false } },
    xAxis: { title: { text: null }, labels: { enabled: false } },
    legend: { enabled: false },
    tooltip: { enabled: false },
    chart: { height: 150, width: 200 },

  }),
  full: ({
    title: { text: 'Cumulative distribution function' },
    yAxis: { min: 0, max: 100, title: { text: 'Probability (%)' } },
    xAxis: { title: { text: 'Time (h)' } },
    legend: { enabled: false },

  }),
})

const Graph = ({ data, graphView }) => (
  <ReactHighcharts
    config={{
      ...config[graphView],
      series: [{
        name: 'Cumulative distribution function',
        step: true,
        data,
      }],
    }}
  />
)

Graph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  graphView: PropTypes.string.isRequired,
}

Graph.defaultProps = {
  data: [],
}

export default Graph
