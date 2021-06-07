import axios from 'axios'

const apiAuth = axios.create({
    baseURL: 'http://192.168.0.198:3000'
});


export default apiAuth;