const apiUrl = process.env.REACT_APP_API_URL
const apiKey = process.env.REACT_APP_API_TOKEN

const handleResponse = (promise) => {
  return new Promise((resolve, reject) => {
    promise
      .then((res) => {
        res
          .json()
          .then((resp) => {
            if (res.status >= 200 && res.status < 300) {
              resolve(resp)
            } else if (res.status == 401) {
              // Handle not session
              console.error('AUTH ERROR')
              window.location.href = window.location.href
            } else {
              handleApiError(res)
              reject({ ...resp, status: res.status })
            }
          })
          .catch((e) => {
            handleApiError({
              url: res.url,
              statusText: e.toString(),
            })
            reject(e)
          })
      })
      .catch((e) => {
        handleApiError({
          statusText: e.toString(),
        })
        reject(e)
      })
  })
}

const doRequest = (
  method,
  url,
  params = {},
  body = {},
  headers = {},
  format = 'application/json'
) => {
  // Merge headers with Json headers
  const _headers = Object.assign(
    {
      Accept: format,
      'Content-Type': format,
      //'Access-Control-Allow-Origin' : "*"
    },
    headers
  )
  // Set Query String params
  url = getUrl(url)
  url += buildQueryParams({ ...params, api_key: apiKey })

  // Do the request with native fetch
  body = method == 'GET' || method == 'HEAD' ? null : JSON.stringify(body)

  let options = {
    method: method,
    headers: _headers,
  }
  if (body) options['body'] = body

  try {
    const f = fetch(url, options)
    return f
  } catch (e) {}
}

const getUrl = (path) => {
  return apiUrl + path
}

const handleApiError = (e) => {
  console.error({
    url: location.href,
    endpoint: e.url,
    msg: e.statusText,
    level: 'ERROR',
    type: 'api',
  })
}

const buildQueryParams = (paramsObj) => {
  let params = []

  for (let key in paramsObj) {
    if (Array.isArray(paramsObj[key])) {
      for (let item of paramsObj[key]) {
        let paramString = encodeURIComponent(item && item.toString())
        if (paramString !== '')
          params.push(`${encodeURIComponent(key)}=${paramString}`)
      }
    } else if (paramsObj[key] != null) {
      let paramString = encodeURIComponent(
        paramsObj[key] && paramsObj[key].toString()
      )
      if (paramString !== '')
        params.push(`${encodeURIComponent(key)}=${paramString}`)
    }
  }
  return params.length > 0 ? '?' + params.join('&') : ''
}

export default {
  doGet: function (url, params, headers) {
    return handleResponse(doRequest('GET', url, params, {}, headers))
  },
  doPost: function (url, params, body, headers) {
    return handleResponse(doRequest('POST', url, params, body, headers))
  },
  doPut: function (url, params, body, headers) {
    return handleResponse(doRequest('PUT', url, params, body, headers))
  },
  doDelete: function (url, params, body, headers) {
    return handleResponse(doRequest('DELETE', url, params, body, headers))
  },
  buildQueryParams: function (paramsObj = {}) {
    try {
      return buildQueryParams(paramsObj)
    } catch (e) {
      console.error(e)
    }
  },
}
