export const tokenStorage = {
  set: (token) => localStorage.setItem('authToken', token),
  get: () => localStorage.getItem('authToken'),
  remove: () => localStorage.removeItem('authToken'),
  clear: () => localStorage.clear()
};