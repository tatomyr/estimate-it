/* globals describe, it, expect */

import React from 'react'
import renderer from 'react-test-renderer'
import AuthScreen from './AuthScreen'

const mockedFunctions = {
  checkCreds: () => null,
  resetCreds: () => null,
  cleanEstimate: () => null,
  closeAuthScreen: () => null,
  openGuestSession: () => null,
  redirect: () => null,
}

describe('AuthScreen', () => {
  it('renders correctly for authorized user', () => {
    const tree = renderer
      .create(<AuthScreen
        match={{ url: '/estimate/new', params: { estimateId: 'new' } }}
        username="Test User"
        checkingCreds={false}
        {...mockedFunctions}
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly for anonymous user', () => {
    const tree = renderer
      .create(<AuthScreen
        match={{ url: '/estimate/new', params: { estimateId: 'new' } }}
        username=""
        checkingCreds={false}
        {...mockedFunctions}
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when checking credentials', () => {
    const tree = renderer
      .create(<AuthScreen
        match={{ url: '/estimate/new', params: { estimateId: 'new' } }}
        username=""
        checkingCreds
        {...mockedFunctions}
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
