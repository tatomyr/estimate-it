import React from 'react'
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const Toastr = () => (
  <ReduxToastr
    transitionIn="fadeIn"
    transitionOut="fadeOut"
  />
)

export default Toastr
