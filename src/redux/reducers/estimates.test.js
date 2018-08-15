/*  globals describe, it, expect */

import {
  UPDATE_ESTIMATE,
  RECALCULATE,
  CLEAN_ESTIMATE,
  CLEAN_ALL_ESTIMATES,
  SET_TITLES,
  MARK_ESTIMATE_SAVED,
} from '../actions/types'
import estimates, { emptyEstimate } from './estimates'

describe('estimates reducer', () => {
  it('returns initial state', () => {
    expect(estimates(undefined, {})).toEqual({ new: emptyEstimate })
  })

  it('updates estimate', () => {
    // Given
    const beforeState = { new: emptyEstimate }
    const action = {
      type: UPDATE_ESTIMATE,
      payload: {
        _id: 'new',
        text: `
          @project Updated estimate
          @participants Test User
        `,
      },
    }
    // When
    const afterState = estimates(beforeState, action)
    // Then
    expect(afterState).toEqual({
      new: {
        _id: 'new',
        text: `
          @project Updated estimate
          @participants Test User
        `,
        graphData: [],
        project: 'Updated estimate',
        participants: ['Test User'],
        calculated: false,
        saved: false,
      },
    })
  })

  it('recalculates estimate', () => {
    // Mock
    console.table = console.log
    // Given
    const beforeState = {
      new: {
        _id: 'new',
        text: `
          @project Updated estimate
          @participants Test User

          Main task
            Subtask A = 1 2
            Subtask B = 10 20
          # Commented task = 42

          @summary
        `,
        graphData: [],
        project: 'Updated estimate',
        participants: ['Test User'],
        calculated: false,
        saved: false,
      },
    }
    const action = {
      type: RECALCULATE,
      payload: { _id: 'new' },
    }
    // When
    const afterState = estimates(beforeState, action)
    // Then
    expect(afterState).toEqual({
      new: {
        _id: 'new',
        text: `
          @project Updated estimate
          @participants Test User

          Main task = 11 12 21 22
            Subtask A = 1 2
            Subtask B = 10 20
          # Commented task = 42

@summary = 11 12 21 22
        `,
        graphData: [[11, 25], [12, 50], [21, 75], [22, 100]],
        project: 'Updated estimate',
        participants: ['Test User'],
        calculated: true,
        saved: false,
      },
    })
  })

  it('cleans estimate', () => {
    // Given
    const beforeState = {
      new: {
        _id: 'new',
        text: `
          @project Updated estimate
          @participants Test User
        `,
        graphData: [],
        project: 'Updated estimate',
        participants: ['Test User'],
        calculated: false,
        saved: false,
      },
    }
    const action = {
      type: CLEAN_ESTIMATE,
      payload: {},
    }
    // When
    const afterState = estimates(beforeState, action)
    // Then
    expect(afterState).toEqual({ new: emptyEstimate })
  })


  it('cleans all estimates', () => {
    // Given
    const beforeState = {
      new: {
        _id: 'new',
        text: `
          New Project
        `,
        graphData: [],
        project: '',
        participants: [],
        calculated: false,
        saved: false,
      },
      saved_project_id: {
        id: 'saved_project_id',
        text: `
          @project Updated estimate
          @participants Test User

          Main task = 11 12 21 22
            Subtask A = 1 2
            Subtask B = 10 20
          # Commented task = 42

@summary = 11 12 21 22
        `,
        graphData: [[11, 25], [12, 50], [21, 75], [22, 100]],
        project: 'Updated estimate',
        participants: ['Test User'],
        calculated: true,
        saved: true,
      },
    }
    const action = { type: CLEAN_ALL_ESTIMATES }
    // When
    const afterState = estimates(beforeState, action)
    // Then
    expect(afterState).toEqual({ new: emptyEstimate })
  })

  it('sets titles of projects', () => {
    // Given
    const beforeState = { new: emptyEstimate }
    const action = {
      type: SET_TITLES,
      payload: {
        projects: [
          { _id: 'foo' },
          { _id: 'bar' },
        ],
      },
    }
    // When
    const afterState = estimates(beforeState, action)
    // Then
    expect(afterState).toEqual({
      new: emptyEstimate,
      foo: { _id: 'foo', saved: true },
      bar: { _id: 'bar', saved: true },
    })
  })

  it('marks estimate as saved', () => {
    // Given
    const beforeState = {
      saved_estimate_id: {
        _id: 'saved_estimate_id',
        text: `
          @project Updated estimate
          @participants Test User

          Main task = 11 12 21 22
            Subtask A = 1 2
            Subtask B = 10 20
          # Commented task = 42

          @summary = 11 12 21 22
        `,
        graphData: [[11, 25], [12, 50], [21, 75], [22, 100]],
        project: 'Updated estimate',
        participants: ['Test User'],
        calculated: true,
        saved: false,
      },
    }
    const action = {
      type: MARK_ESTIMATE_SAVED,
      payload: { _id: 'saved_estimate_id' },
    }
    // When
    const afterState = estimates(beforeState, action)
    // Then
    expect(afterState).toEqual({
      saved_estimate_id: {
        _id: 'saved_estimate_id',
        text: `
          @project Updated estimate
          @participants Test User

          Main task = 11 12 21 22
            Subtask A = 1 2
            Subtask B = 10 20
          # Commented task = 42

          @summary = 11 12 21 22
        `,
        graphData: [[11, 25], [12, 50], [21, 75], [22, 100]],
        project: 'Updated estimate',
        participants: ['Test User'],
        calculated: true,
        saved: true,
      },
    })
  })
})
