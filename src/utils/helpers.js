import history from './history'

export const setInLocalStorage = (name, data) => {
  localStorage.setItem(name, data)
}

export const retrieveFromLocalStorage = (name) => {
  const retrievedData = localStorage.getItem(name)
  return retrievedData
}

export const removeFromLocalStorage = (name) => {
  localStorage.removeItem(name)
}

export const navigateToRespectivePage = (path) => {
  history.push(path)
}
