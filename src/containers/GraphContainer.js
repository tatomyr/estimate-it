import { connect } from 'react-redux';
import Graph from '../components/Graph';

const mapStateToProps = state => state;

// const mapDispatchToProps = dispatch => {
//   return {
//     onTextChange: (text, e) => {
//       dispatch({ type: 'CHANGE_TEXT', text, e })
//     }
//   }
// }

const GraphContainer = connect(mapStateToProps)(Graph)

export default GraphContainer;
