import React from 'react'
import renderer from 'react-test-renderer'
import AuthScreen from './AuthScreen'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <AuthScreen
        match={{ params: { estimateId: 'new' } }}
        username="Test User"
        checkCreds={_ => null}
        resetCreds={_ => null}
        cleanEstimate={_ => null}
        closeAuthScreen={_ => null}
        openGuestSession={_ => null}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
