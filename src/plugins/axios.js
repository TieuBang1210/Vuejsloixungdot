import axios from 'axios';

const axiosInstance = axios.create(
    {
        baseURL: 'http://115.78.94.36:10000/',
        headers: {
            'accept': 'application/json'

        }
    }
);

export default axiosInstance;