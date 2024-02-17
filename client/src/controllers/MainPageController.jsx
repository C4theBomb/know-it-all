import { useCallback, useEffect, useState } from 'react';

import { MainPageBase } from '../components';
import { createRequest } from '../utils/requests';

function MainPageController() {
    const [ownedOrgs, setOwnedOrgs] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [form, setForm] = useState({
        name: '',
        id: '',
    });

    const getOwnedOrgs = useCallback(async () => {
        try {
            const instance = createRequest();
            const response = await instance.get('/auth/orgs');
            setOwnedOrgs(() => response.data.orgs);
        } catch (error) {}
    }, []);

    const getMemberOrgs = useCallback(async () => {
        try {
            const instance = createRequest();
            const response = await instance.get('/auth/orgs/member');
            setOrgs(() => response.data.orgs);
        } catch (error) {}
    }, []);

    useEffect(() => {
        getOwnedOrgs();
        getMemberOrgs();
    }, [getOwnedOrgs, getMemberOrgs]);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm((form) => {
            return { ...form, [name]: value };
        });
    }

    async function makeOrg(e) {
        e.preventDefault();
        const instance = createRequest();
        instance.post('/org/create', form).then(getOwnedOrgs);
    }

    async function joinOrg(e) {
        e.preventDefault();
        const instance = createRequest();
        instance.post(`/org/${form.id}/add`, {}).then(getMemberOrgs);
    }

    return (
        <MainPageBase
            form={form}
            orgs={orgs}
            ownedOrgs={ownedOrgs}
            handleChange={handleChange}
            joinOrg={joinOrg}
            createOrg={makeOrg}
        />
    );
}

export default MainPageController;
