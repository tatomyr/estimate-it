/*  globals describe, it, expect */

import { SET_LOCATION, RESET_LOCATION } from '../actions/types'
import redirector from './redirector'

describe("redirector's behavior", () => {
  it('returns initial state', () => {
    expect(redirector(undefined, {})).toEqual({ location: '' })
  })

  it('sets up correct path (string)', () => {
    // Given
    const beforeState = { location: '' }
    const action = { type: SET_LOCATION, payload: '/estimate/new' }
    // When
    const afterState = redirector(beforeState, action)
    // Then
    expect(afterState).toEqual({ location: '/estimate/new' })
  })

  it('sets up correct path (object)', () => {
    // Given
    const beforeState = { location: '' }
    const action = {
      type: SET_LOCATION,
      payload: {
        pathname: '/auth',
        state: { from: '/estimate/new' },
      },
    }
    // When
    const afterState = redirector(beforeState, action)
    // Then
    expect(afterState).toEqual({
      location: {
        pathname: '/auth',
        state: { from: '/estimate/new' },
      },
    })
  })

  it('resets path', () => {
    // Given
    const beforeState = { location: '/estimate/new' }
    const action = { type: RESET_LOCATION }
    // When
    const afterState = redirector(beforeState, action)
    expect(afterState).toEqual({ location: '' })
  })
})
