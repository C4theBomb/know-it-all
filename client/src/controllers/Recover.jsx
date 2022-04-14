import React, { useState } from 'react';
import axios from 'axios';

import RecoverForm from '../components/RecoverForm';

function Recover() {
    const [form, setForm] = useState({
        email: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
            .get(
                `${process.env.REACT_APP_API_ROOT}/auth/reset-password?${form.email}`
            )
            .then((response) => {
                setSuccess(() => response.data);
            })
            .catch((e) => setError(() => e.response.data));
    }

    return (
        <RecoverForm
            form={form}
            error={error}
            success={success}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

export default Recover;
