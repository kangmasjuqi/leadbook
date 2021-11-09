import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.MIX_REACT_APP_API_ENDPOINT,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        const config2 = config;

        if (token) {
            config2.headers.Authorization = token;
        } else {
            delete instance.defaults.headers.common.Authorization;
        }

        return config2;
    },

    (error) => Promise.reject(error)
);

export default instance;
