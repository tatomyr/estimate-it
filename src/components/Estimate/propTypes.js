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
