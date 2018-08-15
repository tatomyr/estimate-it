/* globals describe, it, expect */

import React from 'react'
import renderer from 'react-test-renderer'
import { HashRouter as Router } from 'react-router-dom'
import Redirector from './Redirector'

describe('Redirector', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Redirector
        redirector={{ location: '' }}
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Router>
          <Redirector
            redirector={{ location: '/estimate/new' }}
          />
        </Router> /* eslint-disable-line comma-dangle */
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
