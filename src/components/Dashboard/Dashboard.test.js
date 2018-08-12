/* globals describe, it, expect */

import React from 'react'
import renderer from 'react-test-renderer'
import { HashRouter as Router } from 'react-router-dom'
import Dashboard from './Dashboard'
import { emptyEstimate } from '../../redux/reducers/estimates'

describe('Dashboard', () => {
  it('renders defaults correctly', () => {
    const tree = renderer
      .create(
        <Router>
          <Dashboard
            estimates={{ emptyEstimate }}
          />
        </Router> // eslint-disable-line comma-dangle
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
