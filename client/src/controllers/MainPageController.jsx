import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { MainPageBase } from '../components';
import { getMemberOrgs, getOwnedOrgs } from '../services/userServices';
import { createOrg, addMember } from '../services/orgServices';

function MainPageController() {
    const navigate = useNavigate();

    const [ownedOrgs, setOwnedOrgs] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [form, setForm] = useState({
        name: '',
        id: '',
    });

    useEffect(() => {
        if (Cookies.get('token')) {
            retrieveMemberOrgs();
            retrieveOwnedOrgs();
        } else {
            navigate('/login');
        }
    }, [navigate]);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm((form) => {
            return { ...form, [name]: value };
        });
    }

    async function retrieveOwnedOrgs() {
        const { orgs } = await getOwnedOrgs().catch((e) => console.log(e));

        setOwnedOrgs(() => orgs);
    }

    async function retrieveMemberOrgs() {
        const { orgs } = await getMemberOrgs().catch((e) => console.log(e));

        setOrgs(() => orgs);
    }

    async function makeOrg(e) {
        e.preventDefault();

        await createOrg({ orgName: form.name })
            .then(retrieveOwnedOrgs)
            .catch((e) => console.log(e));
    }

    async function joinOrg(e) {
        e.preventDefault();

        await addMember.then(retrieveMemberOrgs).catch((e) => console.log(e));
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
