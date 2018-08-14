/*  globals describe, it, expect */

// import {
//   UPDATE_ESTIMATE,
//   RECALCULATE,
//   CLEAN_ESTIMATE,
//   CLEAN_ALL_ESTIMATES,
//   SET_TITLES,
//   MARK_ESTIMATE_SAVED,
// } from '../actions/types'
import estimates, { emptyEstimate } from './estimates'

describe('estimates reducer', () => {
  it('returns initial state', () => {
    expect(estimates(undefined, {})).toEqual({ new: emptyEstimate })
  })

  // TODO: implement tests for CLEAN_ESTIMATE
})
