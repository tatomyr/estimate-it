import React from 'react'
import { Link } from 'react-router-dom'
import { Panel } from './Layouts'

const Home = () => (
  <Panel>
    <h1>Estimate It!</h1>
    <Link to="/estimate/new">
      Create new estimate
    </Link>
  </Panel>
)


export default Home
