import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://192.168.1.237:4100/api/v1'
    baseURL: 'http://inheritxdev.in/confabb/app/api/'
});

export default instance;

