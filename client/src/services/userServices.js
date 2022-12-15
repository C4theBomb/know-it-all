import Cookies from 'js-cookie';

import { createRequest } from './requests';

async function login({ username, password, remember }) {
    const encoded = Buffer.from(`${username}:${password}`).toString('base64');

    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `basic ${encoded}`;

    try {
        const { data } = await instance.post('/login', { remember });

        if (remember) {
            Cookies.set('token', data.token, { expires: 365 });
        } else {
            Cookies.set('token', data.token, { expires: 1 });
        }

        return data;
    } catch (error) {
        console.log(error.response.data);
        return error;
    }
}

async function register({ data }) {
    const instance = createRequest('/auth');

    try {
        await instance.post('/register', { data });
    } catch (error) {
        console.log(error.response.data);
        return error;
    }
}

async function logout() {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    try {
        await instance.post('/logout');
    } catch (error) {
        console.log(error.response.data);
        return error;
    }
}

async function remember() {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    if (Cookies.get('token')) {
        try {
            const { data } = await instance.post('/remember');

            return data.user;
        } catch (error) {
            console.log(error.response.data);
            return error.response.data;
        }
    }
}

async function getUser(userID) {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    if (Cookies.get('token')) {
        try {
            const { data } = await instance.get(`/${userID}`);

            return data.user;
        } catch (error) {
            console.log(error.response.data);
            return error.response.data;
        }
    }
}

async function requestReset() {}

async function resetPassword() {}

async function getMemberOrgs() {}

async function getOwnedOrgs() {}

async function setAudio() {}

async function updateUserDetails() {}

export { login, logout, register, remember, getUser };
