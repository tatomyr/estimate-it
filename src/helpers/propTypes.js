import PropTypes from 'prop-types'

export const estimateType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  _changed: PropTypes.string,
  project: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.string),
  modifiedBy: PropTypes.string,
  text: PropTypes.string,
  graphData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  calculated: PropTypes.bool,
  saved: PropTypes.bool.isRequired,
})

export const matchType = PropTypes.shape({
  params: PropTypes.shape({
    estimateId: PropTypes.string,
  }).isRequired,
})

export const locationType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.any,
  }),
])
