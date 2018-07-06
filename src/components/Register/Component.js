// import React from 'react'
// import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
// import { toggleAuthScreen } from '../../redux/actions';

// class AuthScreen extends React.Component {
//   componentWillMount() {
//     const { match: { params }, hasKey, checkCreds, saveCreds, getEstimate } = this.props
//     checkCreds(params)
//     console.log(678, !hasKey && !!params.estimateId)
//     if (!hasKey && !!params.estimateId) {
//       toggleAuthScreen(true)
//     } else {
//       getEstimate(params)
//     }
//   }

//   componentWillReceiveProps(newProps) {
//     const { match: { params }, hasKey, checkCreds, saveCreds, getEstimate } = newProps
//     console.log(this.props.match.params,2222, params, hasKey)
//     if (!hasKey && !!params.estimateId) {
//       toggleAuthScreen(true)
//     } else {
//       getEstimate(params)
//     }
//   }

//   render() {
//     // hasKey || !params.estimateId
//     const { match: { params }, hasKey, checkCreds, saveCreds, getEstimate, showAuthScreen } = this.props
//     console.log(777, showAuthScreen)
//     return (
//       <div className={`auth-screen overlay ${showAuthScreen ? '' : 'hidden'}`}>
//         <form
//           onSubmit={e => {
//             e.preventDefault()
//             saveCreds(e.target.apiKey.value, params)
//           }}
//         >
//           <input
//             type="password"
//             name="apiKey"
//             placeholder="Enter access key..."
//           />
//         </form>
//         <Link to="/">Guest Session</Link>
//       </div>
//     )
//   }
// }

// export default AuthScreen
