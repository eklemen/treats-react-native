import { AsyncStorage } from 'react-native';
import axios from 'axios';undefined
const PROD_URL = 'https://secret-waters-55210.herokuapp.com/v1';
const DEV_URL = 'http://localhost:3000/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = DEV_URL;
axios.defaults.headers.common['Authorization'] = '';

_authReq = async () => {
    try {
        const Authorization = await AsyncStorage.getItem('treatsToken');
        return {headers: { Authorization }};
    } catch (err) {
        console.log('Cannot retrieve token: ', err);
    }
};
const Api = {};

Api.signIn = async (email, password) => {
    try {
        const res = await axios.post('/signin', { email, password });
        const { data: { token } } = res;
        axios.defaults.headers.common['Authorization'] = token;
        return token;
    } catch (err) {
        console.log('ApiServie signIn err: ', err);
    }
};

Api.signUp = async (email, password) => {
    try {
        const res = await axios.post('/signup', { email, password });
        const { data: { token } } = res;
        axios.defaults.headers.common['Authorization'] = token;
        return token;
    } catch (err) {
        console.log('ApiServie signUp err: ', err);
    }
};

Api.logout = async () => {
    try {
        await axios.get('/logout');
        axios.defaults.headers.common['Authorization'] = "";
    } catch (err) {
        console.log('ApiServie logout err: ', err);
    }
};

Api.getUsers = () => {
    axios.get('/users')
        .then( response => {
            // console.log('response.data', response.data);
        }, err => {
            console.log('err1', err);
        })
};

Api.getHouses = async () => {
    try {
        const auth = await _authReq();
        const res = await axios.get('/houses', auth);
        const { data: {data} } = res;
        return data
    } catch (err) {
        console.log('ApiServie getHouses err: ', err);
    }
};

Api.addHouse = async (house) => {
    try {
        const reqObj = { position: house };
        const auth = await _authReq();
        await axios.post('/houses', reqObj, auth);
    } catch (err) {
        console.log('ApiServie addHouses err: ', err);
    }
};

Api.putVote = async (id, vote) => {
    try {
        const auth = await _authReq();
        await axios.put(`/houses/${id}/vote`, vote, auth);
    } catch (err) {
        console.log('ApiService putVote err: ', err);
    }
};

export default Api;
