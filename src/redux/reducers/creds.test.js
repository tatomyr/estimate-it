/*  globals describe, it, expect */

import { SET_CREDS, RESET_CREDS } from '../actions/types'
import creds, { emptyCreds } from './creds'

describe('authentication', () => {
  it('returns initial state', () => {
    expect(creds(undefined, {})).toEqual(emptyCreds)
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
      haveBeenChecked: true,
      user: 'Test User',
      dbName: 'dbName',
      apiKey: 'apiKey',
    })
  })

  it('resets creds correctly', () => {
    // Given
    const beforeState = {
      haveBeenChecked: false,
      user: 'Test User',
      dbName: 'dbName',
      apiKey: 'apiKey',
    }
    const action = { type: RESET_CREDS }
    // When
    const afterState = creds(beforeState, action)
    // Then
    expect(afterState).toEqual({ ...emptyCreds, haveBeenChecked: true })
  })
})
