import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import RegisterForm from '../components/RegisterForm';

function Register() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        pronouns: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm((form) => {
            return { ...form, [name]: value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const { confirmPassword, ...filteredForm } = form;
        await axios
            .post(`${process.env.REACT_APP_API_ROOT}/auth/register`, {
                ...filteredForm,
                orgID: params.orgID,
            })
            .then(() => {
                navigate('/login');
            })
            .catch((e) => setError(() => e.response.data));
    }

    return (
        <RegisterForm
            form={form}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            error={error}
        />
    );
}

export default Register;
