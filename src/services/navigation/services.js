export const getQueryParam = (location, key) => {
  const params = new URLSearchParams(location.search)
  return params.get(key)
}

export const buildQueryString = params => {
  const queryString = Object.keys(params)
    .map(key => {
      if (params[key]) {
        return `${key}=${encodeURIComponent(params[key])}`
      }
      return null
    })
    .filter(Boolean)
    .join('&')

  return !!queryString ? `?${queryString}` : ''
}
