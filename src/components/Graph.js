import React from 'react';
import ReactHighcharts from 'react-highcharts';

const config = {};

export default props => (
  <div>
    <ReactHighcharts
      config={{
        ...config,
        series: [{ data: props.graphData }, { data: props.reducedGraphData }],
      }}
    />
  </div>
);
