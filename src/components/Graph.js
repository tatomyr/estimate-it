import React from 'react'
import ReactHighcharts from 'react-highcharts'

const config = {}

export default ({
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
