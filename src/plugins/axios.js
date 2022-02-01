import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;

axios.defaults.baseURL = apiUrl;

export default axios;