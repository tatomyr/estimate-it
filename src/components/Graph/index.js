import { connect } from 'react-redux'
import Graph from './Graph'

const mapStateToProps = ({ estimate: { graphData } }) => ({
  graphData,
})

export default connect(mapStateToProps)(Graph)
