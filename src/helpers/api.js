import { checkId } from './settings'

export const setCreds = ({ dbName, apiKey }) => {
  localStorage.setItem('dbName', dbName)
  localStorage.setItem('apiKey', apiKey)
}

export const getCreds = () => ({
  dbName: localStorage.getItem('dbName'),
  apiKey: localStorage.getItem('apiKey'),
})

export const removeCreds = () => {
  localStorage.removeItem('dbName')
  localStorage.removeItem('apiKey')
}

const headers = () => ({
  'content-type': 'application/json',
  'x-apikey': getCreds().apiKey,
  'cache-control': 'no-cache',
})

const db = (collection, method = 'GET', data = null) => new Promise((resolve, reject) => {
  fetch(`https://${getCreds().dbName}.restdb.io/rest/${collection}`, {
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
  project = '',
}) => (_id === 'new'
  ? db('estimates', 'POST', { text, graphData, project })
  : db(`estimates/${_id}`, 'PUT', { text, graphData, project }))

export const getEstimate = ({ estimateId }) => db(`estimates/${estimateId}`)

export const checkCreds = () => db(`check/${checkId}`)
