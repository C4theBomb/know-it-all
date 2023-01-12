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
        try {
            const { orgs } = await getOwnedOrgs().catch((e) => console.error(e));
            setOwnedOrgs(() => orgs);
        } catch (error) {
            const message = error.response.data;

            console.error(message.error);
        }
    }

    async function retrieveMemberOrgs() {
        try {
            const { orgs } = await getMemberOrgs().catch((e) => console.error(e));
            setOrgs(() => orgs);
        } catch (error) {
            const message = error.response.data;

            console.error(message.error);
        }
    }

    async function makeOrg(e) {
        e.preventDefault();

        try {
            await createOrg({ orgName: form.name })
                .then(retrieveOwnedOrgs)
                .catch((e) => console.log(e));
        } catch (error) {
            const message = error.response.data;

            console.error(message.error);
        }
    }

    async function joinOrg(e) {
        e.preventDefault();

        try {
            await addMember(form.id);
            await retrieveMemberOrgs();
        } catch (error) {
            const message = error.response.data;

            console.error(message.error);
        }
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
