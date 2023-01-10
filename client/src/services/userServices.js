import Cookies from 'js-cookie';
import { Buffer } from 'buffer';

import { createRequest } from './requests';
import axios from 'axios';

async function login({ email, password, remember }) {
    const encoded = Buffer.from(`${email}:${password}`).toString('base64');

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
        console.error(error.response.data);
        return error;
    }
}

async function register(data) {
    const instance = createRequest('/auth');

    try {
        await instance.post('/register', data);
    } catch (error) {
        console.error(error.response.data);
        return error;
    }
}

async function logout() {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    try {
        await instance.post('/logout');
    } catch (error) {
        console.error(error.response.data);
        return error;
    }
}

async function remember() {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    if (Cookies.get('token')) {
        try {
            const { data } = await instance.post('/remember');

            return data;
        } catch (error) {
            console.error(error.response.data);
            return error.response.data;
        }
    }
}

async function getUser(userID) {
    const instance = createRequest('/auth');

    try {
        const { data } = await instance.get(`/${userID}`);

        return data.user;
    } catch (error) {
        console.error(error.response.data);
        return error.response.data;
    }
}

async function requestReset(data) {
    const instance = createRequest('/auth');

    try {
        await instance.post(`/reset`, data);
    } catch (error) {
        console.error(error.response.data);
        return error.response.data;
    }
}

async function resetPassword(id, data) {
    const instance = createRequest('/auth');

    try {
        await instance.patch(`/reset/${id}`, data);
    } catch (error) {
        console.error(error.response.data);
        return error.response.data;
    }
}

async function setAudio(data) {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    try {
        await instance.post('/audio', data);
    } catch (error) {
        console.error(error.response.data);
        return error.response.data;
    }
}

async function getAudio(userID) {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_DOMAIN_ROOT}/public/audio/${userID}.mp3`,
            {
                responseType: 'blob',
            }
        );

        return response.data;
    } catch (error) {
        return;
    }
}

async function updateUserDetails(data) {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    try {
        await instance.post(`/update`, data);
    } catch (error) {
        console.error(error.response.data);
        return error.response.data;
    }
}

async function getMemberOrgs() {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    try {
        const { data } = await instance.get(`/orgs/member`);

        return data;
    } catch (error) {
        console.error(error.response.data);
        return error.response.data;
    }
}

async function getOwnedOrgs() {
    const instance = createRequest('/auth');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    try {
        const { data } = await instance.get(`/orgs`);

        return data;
    } catch (error) {
        console.error(error.response.data);
        return error.response.data;
    }
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
