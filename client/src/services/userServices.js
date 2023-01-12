import Cookies from 'js-cookie';
import { Buffer } from 'buffer';

import { createRequest } from './requests';
import axios from 'axios';

async function login({ email, password, remember }) {
    const encoded = Buffer.from(`${email}:${password}`).toString('base64');

    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `basic ${encoded}`;

    const { data } = await instance.post('/login', { remember });

    if (remember) {
        Cookies.set('token', data.token, { expires: 365 });
    } else {
        Cookies.set('token', data.token, { expires: 1 });
    }

    return data;
}

async function register(data) {
    const instance = createRequest('/auth');

    await instance.post('/register', data);
}

async function logout() {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    await instance.post('/logout');
}

async function remember() {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    if (Cookies.get('token')) {
        const { data } = await instance.post('/remember');
        return data;
    }
}

async function getUser(userID) {
    const instance = createRequest('/auth');

    const { data } = await instance.get(`/${userID}`);

    return data.user;
}

async function requestReset(data) {
    const instance = createRequest('/auth');

    await instance.post(`/reset`, data);
}

async function resetPassword(id, data) {
    const instance = createRequest('/auth');

    await instance.patch(`/reset/${id}`, data);
}

async function setAudio(data) {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    await instance.post('/audio', data);
}

async function getAudio(userID) {
    const response = await axios.get(
        `${process.env.REACT_APP_DOMAIN_ROOT}/public/audio/${userID}.mp3`,
        {
            responseType: 'blob',
        }
    );

    return response.data;
}

async function updateUserDetails(data) {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    await instance.post(`/update`, data);
}

async function getMemberOrgs() {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    const { data } = await instance.get(`/orgs/member`);

    return data;
}

async function getOwnedOrgs() {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    const { data } = await instance.get(`/orgs`);

    return data;
}

export {
    login,
    logout,
    register,
    remember,
    getUser,
    requestReset,
    resetPassword,
    setAudio,
    getAudio,
    updateUserDetails,
    getMemberOrgs,
    getOwnedOrgs,
};
