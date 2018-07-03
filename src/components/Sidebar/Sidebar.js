import React from 'react'

const Sidebar = ({ recalc, saveEstimate }) => (
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
      onClick={saveEstimate}
    >
      S
    </button>
  </aside>
)

export default Sidebar
