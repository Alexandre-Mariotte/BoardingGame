const PORT = window.location.port || '3000';
if (window.location.hostname === 'localhost') {
  window.SERVER_URL = `http://localhost:${PORT}`;
} else {
  window.SERVER_URL = 'https://boardinggame-production.up.railway.app';
}
