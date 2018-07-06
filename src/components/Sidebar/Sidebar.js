import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({
  match: { params },
  recalc,
  saveEstimate,
  openAuthScreen,
  closeAuthScreen,
}) => (
  <aside>
    <button
      type="button"
      onClick={() => recalc(params.estimateId)}
      title="Recalculate sheet"
    >
      ✓
    </button>
    <button
      type="button"
    >
      ✗
    </button>
    <button
      type="button"
      onClick={() => saveEstimate(params)}
      title="Save estimate"
    >
      S
    </button>
    <Link to="/estimate/new">
      <button
        type="button"
        title="New estimate"
      >
        N
      </button>
    </Link>
    <button
      type="button"
      onClick={openAuthScreen}
      title="Enter credentials"
    >
      A
    </button>
  </aside>
)

export default Sidebar
