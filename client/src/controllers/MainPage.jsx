import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import MainPageBase from '../components/MainPageBase';

function MainPage() {
    const navigate = useNavigate();

    const [ownedOrgs, setOwnedOrgs] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [form, setForm] = useState({
        name: '',
        id: '',
    });

    useEffect(() => {
        if (Cookies.get('token')) {
            getMemberOrgs();
            getOwnedOrgs();
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

    async function getOwnedOrgs() {
        await axios
            .get(
                `${process.env.REACT_APP_API_ROOT}/auth?token=${Cookies.get(
                    'token'
                )}`
            )
            .then((response) => {
                setOwnedOrgs(() => response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    async function getMemberOrgs() {
        await axios
            .get(
                `${
                    process.env.REACT_APP_API_ROOT
                }/auth/orgs?token=${Cookies.get('token')}`
            )
            .then((response) => {
                setOrgs(() => response.data);
            });
    }

    async function createOrg(e) {
        e.preventDefault();
        console.log('create');

        await axios
            .post(`${process.env.REACT_APP_API_ROOT}/org/create`, {
                token: Cookies.get('token'),
                orgName: form.name,
            })
            .then(() => {
                getOwnedOrgs();
            });
    }

    async function joinOrg(e) {
        e.preventDefault();

        await axios
            .post(`${process.env.REACT_APP_API_ROOT}/org/${form.id}/add`, {
                token: Cookies.get('token'),
            })
            .then(() => {
                getMemberOrgs();
            });
    }

    return (
        <MainPageBase
            form={form}
            orgs={orgs}
            ownedOrgs={ownedOrgs}
            joinOrg={joinOrg}
            createOrg={createOrg}
            handleChange={handleChange}
        />
    );
}

export default MainPage;
