/* globals describe, it, expect */

import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import AuthScreen from './AuthScreen'

const commons = {
  location: { pathname: '/', state: { from: '/' } },
  match: { url: '/estimate/new', params: { estimateId: 'new' } },
  checkCreds: () => null,
  resetCreds: () => null,
  cleanAllEstimates: () => null,
  redirect: () => null,
}

describe('AuthScreen', () => {
  it('renders correctly for authorized user', () => {
    const tree = renderer
      .create(
        <Router>
          <AuthScreen
            creds={{
              haveBeenChecked: true,
              username: 'Test User',
            }}
            {...commons}
          />
        </Router> // eslint-disable-line comma-dangle
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly for anonymous user', () => {
    const tree = renderer
      .create(
        <Router>
          <AuthScreen
            creds={{
              haveBeenChecked: true,
              username: '',
            }}
            {...commons}
          />
        </Router> // eslint-disable-line comma-dangle
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when checking credentials', () => {
    const tree = renderer
      .create(
        <Router>
          <AuthScreen
            creds={{
              haveBeenChecked: false,
              username: '',
            }}
            {...commons}
          />
        </Router> // eslint-disable-line comma-dangle
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
