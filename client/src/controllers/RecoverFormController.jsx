import React, { useState } from 'react';

import { RecoverForm } from '../components';
import { createRequest } from '../utils/requests';

function RecoverFormController() {
    const [form, setForm] = useState({});
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

        try {
            const instance = createRequest();
            await instance.post('/auth/reset', form);
        } catch (error) {
            setError(() => error.response.data);
        }
    }

    return (
        <RecoverForm
            form={form}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}

export default RecoverFormController;
