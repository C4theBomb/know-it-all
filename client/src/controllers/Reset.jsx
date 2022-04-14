import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import ResetForm from '../components/ResetForm';

function Reset() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
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
        await axios
            .patch(
                `${process.env.REACT_APP_API_ROOT}/auth/reset-password/${id}`,
                {
                    password: form.password,
                }
            )
            .then(() => {
                navigate('/login');
            })
            .catch((e) => setError(() => e.response.data));
    }

    return (
        <ResetForm
            form={form}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            error={error}
        />
    );
}

export default Reset;
