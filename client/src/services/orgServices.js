import Cookies from 'js-cookie';

import { createRequest } from './requests';

async function addMember(id) {
    const instance = createRequest(`/org`);
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    try {
        await instance.post(`/${id}/add`);
    } catch (error) {
        console.log(error.response.data);
        return error;
    }
}

async function createOrg(data) {
    const instance = createRequest('/org');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    try {
        await instance.post('/', data);
    } catch (error) {
        console.log(error.response.data);
        return error;
    }
}

async function deleteOrg(id) {
    const instance = createRequest('/org');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    try {
        await instance.delete(`/${id}`);
    } catch (error) {
        console.log(error.response.data);
        return error;
    }
}

async function getOrg(id) {
    const instance = createRequest('/org');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    try {
        await instance.delete('/logout');
    } catch (error) {
        console.log(error.response.data);
        return error;
    }
}

async function removeMember(id, doomedUsers) {
    const instance = createRequest('/org');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    try {
        await instance.post(`/${id}/remove`, { doomedUsers });
    } catch (error) {
        console.log(error.response.data);
        return error;
    }
}

async function updateOrgDetails(id, data) {
    const instance = createRequest('/org');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    try {
        await instance.patch(`/${id}`, { data });
    } catch (error) {
        console.log(error.response.data);
        return error;
    }
}
