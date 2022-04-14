import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import LoginForm from '../components/LoginForm';

function Login({ setToken }) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [error, setError] = useState('');

    useEffect(() => {
        async function logout() {
            await axios
                .post(`${process.env.REACT_APP_API_ROOT}/auth/logout`, {
                    token: Cookies.get('token'),
                })
                .catch((e) => {
                    console.log(e);
                });

            Cookies.remove('token');
            Cookies.remove('userID');

            setToken(() => false);
        }

        if (Cookies.get('token')) {
            logout();
        }
    }, [setToken]);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm((form) => {
            return { ...form, [name]: value };
        });
    }

    function handleCheckboxChange(e) {
        const name = e.target.name;
        const checked = e.target.checked;

        setForm(() => {
            return { ...form, [name]: checked };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await axios
            .post(`${process.env.REACT_APP_API_ROOT}/auth/login`, form)
            .then((response) => {
                Cookies.set('token', response.data.token, {
                    expires: form.remember ? 3650 : 1,
                });
                Cookies.set('userID', response.data.userID, {
                    expires: form.remember ? 3650 : 1,
                });
                setToken(true);
                navigate('/');
            })
            .catch((e) => setError(() => e.response.data));
    }

    return (
        <LoginForm
            form={form}
            error={error}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCheckboxChange={handleCheckboxChange}
        />
    );
}

export default Login;
