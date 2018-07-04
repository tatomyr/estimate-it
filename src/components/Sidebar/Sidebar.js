import React from 'react'

const Sidebar = ({
  recalc,
  saveEstimate,
  redirect,
  match: { params },
}) => (
  <aside>
    <button
      type="button"
      onClick={recalc}
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
    <button
      type="button"
      onClick={redirect}
      title="New estimate"
    >
      N
    </button>
  </aside>
)

export default Sidebar
