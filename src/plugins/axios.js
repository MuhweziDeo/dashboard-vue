import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL || 'https://hiring-example-25770.botics.co';

axios.defaults.baseURL = apiUrl;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers = {...config.headers, Authorization: `Token ${token}`}
    }
    return config
})
export default axios;