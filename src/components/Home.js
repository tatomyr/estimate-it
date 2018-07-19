import React from 'react'
import { Link } from 'react-router-dom'
import { Panel } from './Layouts'

const Home = () => (
  <Panel>
    <h1>Estimate It!</h1>
    <Link to="/estimate/new">
      Create new estimate
    </Link>
    <h2>
      Example
    </h2>
    <article>
      {/* FIXME: align pre content properly */}
      <pre>
        {`@project My Project

Simple task = 10 20
Complex task
  Subtask Nº1 = 3 4
  Subtask Nº2 = 5
# Commented task = 42

@summary`}
      </pre>
    </article>
  </Panel>
)


export default Home
