import React from 'react'
import './styles.css'

// FIXME: delete

// export const Panel = ({ children }) => (
//   <div className="panel">
//     {children}
//   </div>
// )

// export const Container = ({ children, className = '' }) => (
//   <div className={`container ${className}`}>
//     {children}
//   </div>
// )

// export const Row = ({ children, className = '' }) => (
//   <div className={`row ${className}`}>
//     {children}
//   </div>
// )

// export const Card = ({ children, className = '' }) => (
//   <div className={`card col-md-6 col-lg-6 row ${className}`}>
//     {children}
//   </div>
// )

export const ControlButton = ({ children }) => (
  <button type="button" className="control-button">
    {children}
  </button>
)
