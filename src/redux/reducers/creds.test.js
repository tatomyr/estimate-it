/*  globals describe, it, expect */

import { SET_CREDS_CHECKING, SET_CREDS, RESET_CREDS } from '../actions/types'
import creds, { emptyCreds } from './creds'

describe('authentication', () => {
  it('returns initial state', () => {
    expect(creds(undefined, {})).toEqual({ ...emptyCreds })
  })

  it('sets checking creds status correctly', () => {
    // Given
    const beforeState = emptyCreds
    const action = { type: SET_CREDS_CHECKING }
    // When
    const afterState = creds(beforeState, action)
    // Then
    expect(afterState).toEqual({
      ...emptyCreds,
      checkingCreds: true,
    })
  })

  it('sets creds correctly', () => {
    // Given
    const beforeState = emptyCreds
    const action = {
      type: SET_CREDS,
      payload: {
        user: 'Test User',
        dbName: 'dbName',
        apiKey: 'apiKey',
      },
    }
    // When
    const afterState = creds(beforeState, action)
    // Then
    expect(afterState).toEqual({
      user: 'Test User',
      dbName: 'dbName',
      apiKey: 'apiKey',
      checkingCreds: false,
    })
  })

  it('resets creds correctly', () => {
    // Given
    const beforeState = {
      user: 'Test User',
      dbName: 'dbName',
      apiKey: 'apiKey',
      checkingCreds: true,
    }
    const action = { type: RESET_CREDS }
    // When
    const afterState = creds(beforeState, action)
    // Then
    expect(afterState).toEqual(emptyCreds)
  })
})
