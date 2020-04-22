export function getLocal(key) {
  return localStorage.getItem(key);
}

export function setLocal(key, value) {
  return localStorage.setItem(key, value);
}

export function removeLocal(key) {
  localStorage.removeItem(key);
}
