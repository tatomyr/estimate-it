import { connect } from 'react-redux';
import Graph from '../components/Graph';

const mapStateToProps = state => ({
  graphData: state.graphData,
  reducedGraphData: state.reducedGraphData,
});

const GraphContainer = connect(mapStateToProps)(Graph);

export default GraphContainer;
