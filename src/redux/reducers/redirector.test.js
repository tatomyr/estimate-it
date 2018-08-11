/*  globals describe, it, expect */

import { SET_HREF, RESET_HREF } from '../actions/types'
import redirector from './redirector'

describe("redirector's behavior", () => {
  it('returns initial state', () => {
    expect(redirector(undefined, {})).toEqual({ href: '' })
  })

  it('sets up correct path', () => {
    // Given
    const beforeState = { href: '' }
    const action = { type: SET_HREF, payload: '/estimate/new' }
    // When
    const afterState = redirector(beforeState, action)
    // Then
    expect(afterState).toEqual({ href: '/estimate/new' })
  })

  it('resets path', () => {
    // Given
    const beforeState = { href: '/estimate/new' }
    const action = { type: RESET_HREF }
    // When
    const afterState = redirector(beforeState, action)
    expect(afterState).toEqual({ href: '' })
  })
})
