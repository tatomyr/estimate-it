import React from 'react'

const Sidebar = ({ recalc }) => (
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
  </aside>
)

export default Sidebar
