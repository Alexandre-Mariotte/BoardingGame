let SERVER_URL;

const PORT = window.location.port || '3000';
if (window.location.hostname === 'localhost') {
  SERVER_URL = `http://localhost:${PORT}`;
} else {
  SERVER_URL = 'https://boardinggame-production.up.railway.app/';
}

export default SERVER_URL;
