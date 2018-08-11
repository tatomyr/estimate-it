/* globals describe, it, expect */

import React from 'react'
import renderer from 'react-test-renderer'
import AuthScreen from './AuthScreen'

describe('AuthScreen', () => {
  it('renders correctly for authorized user', () => {
    const tree = renderer
      .create(<AuthScreen
        match={{ url: '/estimate/new', params: { estimateId: 'new' } }}
        username="Test User"
        checkCreds={() => null}
        resetCreds={() => null}
        cleanEstimate={() => null}
        closeAuthScreen={() => null}
        openGuestSession={() => null}
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly for anonymous user', () => {
    const tree = renderer
      .create(<AuthScreen
        match={{ url: '/estimate/new', params: { estimateId: 'new' } }}
        username=""
        checkCreds={() => null}
        resetCreds={() => null}
        cleanEstimate={() => null}
        closeAuthScreen={() => null}
        openGuestSession={() => null}
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
