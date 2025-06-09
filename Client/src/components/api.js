  // src/api.js
  import axios from 'axios';

  const api = axios.create({
    baseURL: 'http://localhost:5000', // Ensure this matches the port used by json-server
  });

  export default api;
