import React from 'react'
import './styles.css'

export const Panel = ({ children }) => (
  <div className="panel">
    {children}
  </div>
)

export const ControlButton = ({ children }) => (
  <button type="button" className="control-button">
    {children}
  </button>
)

// TODO: implement Overlay
export const Overlay = ({ children, className = '' }) => (
  <div className={`overlay ${className}`}>
    {children}
  </div>
)

