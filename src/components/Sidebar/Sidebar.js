// TODO: improve sidebar (adjust it to estimate/dashboard etc.)

import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({
  match: { params: { estimateId } },
  recalc,
  saveEstimate,
  openAuthScreen,
  apiKey,
}) => (
  <aside>
    <button
      type="button"
      onClick={() => recalc(estimateId)}
      title="Calculate estimate"
    >
      ✓
    </button>
    <button
      type="button"
    >
      ✗
    </button>
    {apiKey && (
      <button
        type="button"
        onClick={() => saveEstimate({ estimateId })}
        title="Save estimate"
      >
        S
      </button>
    )}
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
    <Link to={`/estimate/${estimateId}`}>
      <button
        type="button"
        title="Show text"
      >
        E
      </button>
    </Link>
    <Link to={`/estimate/${estimateId}/graph`}>
      <button
        type="button"
        title="Show graph"
      >
        G
      </button>
    </Link>
    {/* TODO: implement document */}
    <Link to={`/estimate/${estimateId}/document`}>
      <button
        type="button"
        title="Show document"
      >
        D
      </button>
    </Link>
  </aside>
)

export default Sidebar
