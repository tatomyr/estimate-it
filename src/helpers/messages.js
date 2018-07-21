import moment from 'moment'

/* eslint-disable import/prefer-default-export */

export const rewrite = ({ _changed, modifiedBy }) => (`
  ${modifiedBy} has changed this estimate ${moment().from(_changed)}.
  Rewrite anyway?
`)

export const signInToSave = 'You must pass authentication to be able to save an estimate.'

export const uncalculated = 'Consider calculating estimate before saving.'

export const cantSave = message => `${message}\nCheck your access rights`

export const noEstimate = "We can't find such a project :("
