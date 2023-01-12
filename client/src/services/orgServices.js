import Cookies from 'js-cookie';

import { createRequest } from './requests';

async function addMember(id) {
    const instance = createRequest(`/org`);
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    await instance.post(`/${id}/add`);
}

async function createOrg(data) {
    const instance = createRequest('/org');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    await instance.post('/', data);
}

async function deleteOrg(id) {
    const instance = createRequest('/org');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    await instance.delete(`/${id}`);
}

async function getOrg(id) {
    const instance = createRequest('/org');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    const response = await instance.get(`/${id}`);
    return response.data;
}

async function removeMember(id, doomedUsers) {
    const instance = createRequest('/org');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    await instance.post(`/${id}/remove`, { doomedUsers });
}

async function updateOrgDetails(id, data) {
    const instance = createRequest('/org');
    instance.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`;

    await instance.patch(`/${id}`, { data });
}

export { addMember, createOrg, deleteOrg, getOrg, removeMember, updateOrgDetails };
