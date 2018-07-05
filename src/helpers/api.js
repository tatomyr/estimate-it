export const setApiKey = apiKey => localStorage.setItem('apiKey', apiKey)

const getApiKey = () => localStorage.getItem('apiKey')

export const hasKey = () => !!getApiKey()

export const removeApiKey = () => localStorage.removeItem('apiKey')

const headers = () => ({
  'content-type': 'application/json',
  'x-apikey': getApiKey(),
  'cache-control': 'no-cache',
})

const db = (collection, method, data = null) => new Promise((resolve, reject) => {
  fetch(`https://estimator-e1e7.restdb.io/rest/${collection}`, {
    method,
    headers: headers(),
    mode: 'cors',
    body: data && JSON.stringify(data),
  })
    .then(res => {
      console.log(res.ok, 'Recieved response:', res)
      return res
    })
    .then(res => res.json())
    .then(resolve)
    .catch(reject)
})

export const saveEstimate = ({ text, estimateId }) => (estimateId
  ? db(`estimates/${estimateId}`, 'PUT', { text })
  : db('estimates', 'POST', { text }))

export const getEstimate = ({ estimateId }) => db(`estimates/${estimateId}`, 'GET')
