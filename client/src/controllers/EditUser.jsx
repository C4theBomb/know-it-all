import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import EditUserForm from '../components/EditUserForm';

function EditUser() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        pronouns: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        async function getInfo() {
            axios
                .get(
                    `${process.env.REACT_APP_API_ROOT}/auth/${Cookies.get(
                        'userID'
                    )}?token=${Cookies.get('token')}`
                )
                .then((response) => {
                    const user = response.data;

                    setForm(() => {
                        return {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            pronouns: user.pronouns,
                        };
                    });
                });
        }
        getInfo();
    }, []);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm((form) => {
            return { ...form, [name]: value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await axios
            .patch(`${process.env.REACT_APP_API_ROOT}/auth/update`, {
                ...form,
                token: Cookies.get('token'),
            })
            .then(() => {
                navigate('/');
            })
            .catch((e) => setError(() => e.response.data));
    }

    return (
        <EditUserForm
            form={form}
            error={error}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
        />
    );
}

export default EditUser;
