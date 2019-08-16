export const redirectTo = (path = '/') => {
  window.history.pushState({}, document.title, path)
}
