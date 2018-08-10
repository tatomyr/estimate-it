export const setCreds = ({ dbName, apiKey, username }) => {
  localStorage.setItem('dbName', dbName)
  localStorage.setItem('apiKey', apiKey)
  localStorage.setItem('username', username)
}

export const getCreds = () => ({
  dbName: localStorage.getItem('dbName'),
  apiKey: localStorage.getItem('apiKey'),
  username: localStorage.getItem('username'),
})

export const removeCreds = () => {
  localStorage.removeItem('dbName')
  localStorage.removeItem('apiKey')
  localStorage.removeItem('username')
}

const headers = () => ({
  'content-type': 'application/json',
  'x-apikey': getCreds().apiKey,
  'cache-control': 'no-cache',
})

const db = (path, method = 'GET', data = null) => new Promise((resolve, reject) => {
  fetch(`https://${getCreds().dbName}.restdb.io/rest/${path}`, {
    method,
    headers: headers(),
    mode: 'cors',
    body: data && JSON.stringify(data),
  })
    .then(res => res.json())
    .then(resolve)
    .catch(reject)
})

export const saveEstimate = ({
  _id,
  text,
  graphData = [],
  project,
  participants,
  calculated,
}) => {
  const options = _id === 'new'
    ? ['estimates', 'POST']
    : [`estimates/${_id}`, 'PUT']
  return db(...options, ({
    text,
    graphData,
    project,
    participants,
    calculated,
    modifiedBy: getCreds().username,
  }))
}

const estimateH = JSON.stringify({
  $fields: {
    _changed: 1,
    modifiedBy: 1,
    _id: 1,
    text: 1,
    project: 1,
    graphData: 1,
    calculated: 1,
  },
})
export const getEstimate = ({ estimateId }) => db(`estimates/${estimateId}?h=${estimateH}`)

const titlesH = JSON.stringify({
  $fields: {
    project: 1,
    _id: 1,
    _changed: 1,
    modifiedBy: 1,
  },
  // FIXME: sort properly
  $orderby: {
    _changed: -1,
  },
})
// Query to fetch only projects that are related to the user
const titlesQ = () => JSON.stringify({
  $or: [
    { participants: { $elemMatch: getCreds().username } },
    { modifiedBy: getCreds().username },
  ],
})
export const fetchTitles = () => db(`estimates?q=${titlesQ()}&h=${titlesH}`)
