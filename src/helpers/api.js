const headers = apiKey => ({
  'content-type': 'application/json',
  'x-apikey': apiKey,
  'cache-control': 'no-cache',
})

const db = (apiKey, collection, method, data = null) => new Promise((resolve, reject) => {
  fetch(`https://estimator-e1e7.restdb.io/rest/${collection}`, {
    method,
    headers: headers(apiKey),
    mode: 'cors',
    body: data && JSON.stringify(data),
  })
    .then(res => {
      console.log('Recieved response:', res)
      return res
    })
    .then(res => res.json())
    .then(resolve)
    .catch(reject)
})

export const saveEstimate = ({ text, apiKey, estimateId }) => (estimateId
  ? db(apiKey, `estimates/${estimateId}`, 'PUT', { text })
  : db(apiKey, 'estimates', 'POST', { text }))


export const getEstimate = ({ apiKey, estimateId }) => db(apiKey, `estimates/${estimateId}`, 'GET')
