import React from 'react';
import ReactHighcharts from 'react-highcharts';

const config = {
  series: [{
    data: [[1,0],[10,7]]
  }]
};

export default props => (
  <div>
    <ReactHighcharts config={config} />
  </div>
)
