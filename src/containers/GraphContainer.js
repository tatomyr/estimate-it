import { connect } from 'react-redux'
import Graph from '../components/Graph'

const mapStateToProps = ({ appData: { reducedGraphData } }) => ({
  reducedGraphData,
})

const GraphContainer = connect(mapStateToProps)(Graph)

export default GraphContainer
