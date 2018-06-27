import React from 'react'
import ReactHighcharts from 'react-highcharts'

const config = {}

export default ({
  graphData,
  reducedGraphData,
}) => (
  <div>
    <ReactHighcharts
      config={{
        ...config,
        series: [{ data: graphData }, { data: reducedGraphData }],
      }}
    />
  </div>
)
