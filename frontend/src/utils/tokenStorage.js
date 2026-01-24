export const tokenStorage = {
  set: (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
    }
  },

  get: () => {
    const token = localStorage.getItem('authToken');
    return token || null; // Return token or null (not undefined)
  },

  remove: () => {
    localStorage.removeItem('authToken');
  },

  clear: () => {
    localStorage.clear();
  },

  exists: () => {
    return !!localStorage.getItem('authToken');
  }
};