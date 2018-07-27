import moment from 'moment'

export const defaultError = ({ message }) => ['Error', `${message}`]

export const rewrite = ({ _changed, modifiedBy }) => (`
  ${modifiedBy} has changed this estimate ${moment(_changed).fromNow()}.
  Rewrite anyway?
`)

export const signInToSave = [
  'Unauthorized',
  'You must pass authentication to be able to save an estimate.',
]

export const noName = [
  'Unnamed project',
  'Use directive @project to give a project name.',
]

export const noParticipants = [
  'No participants',
  'Define a list of participants using directive @participants.',
]

export const uncalculated = [
  'Warning',
  'Consider calculating estimate before saving.',
]

export const saved = ({ _id, project }) => [
  'Saved',
  project || _id,
]

export const cantSave = message => [
  'Error',
  `${message}\nCheck your access rights`,
]

export const noEstimate = "We can't find such a project :("
