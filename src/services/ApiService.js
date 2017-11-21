import axios from 'axios';
const PROD_URL = 'https://secret-waters-55210.herokuapp.com/v1';
const DEV_URL = 'http://localhost:3000/v1';
import { AsyncStorage } from 'react-native';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = DEV_URL;
axios.defaults.headers.common['Authorization'] = '';
const Api = {};

Api.signIn = (email, password) => {
    return axios.post('/signin', { email, password })
};

Api.signUp = (email, password) => {
    return axios.post('/signup', { email, password })
};

Api.logout = () => {
    return axios.get('/logout')
};

Api.getUsers = () => {
    axios.get('/users')
        .then( response => {
            // console.log('response.data', response.data);
        }, err => {
            console.log('err1', err);
        })
};

Api.getHouses = () => {
    axios.get('/houses')
        .then( response => {
            // console.log('response.data', response.data);
        }, err => {
            console.log('err1', err);
        })
};

export default Api;
