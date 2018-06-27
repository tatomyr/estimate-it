import { connect } from 'react-redux'
import Graph from './Graph'

const mapStateToProps = ({ estimate: { reducedGraphData } }) => ({
  reducedGraphData,
})

export default connect(mapStateToProps)(Graph)
