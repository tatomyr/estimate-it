import React from 'react'
import PropTypes from 'prop-types'
import ReactHighcharts from 'react-highcharts'

const config = {}

const Graph = ({
  match: { params },
  estimates,
}) => (
  <div>
    <ReactHighcharts
      config={{
        ...config,
        series: [{ data: (estimates[params.estimateId] || {}).graphData }],
      }}
    />
  </div>
)

export default Graph
