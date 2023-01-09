import React, { useState } from 'react';

import { RecoverForm } from '../components';
import { requestReset } from '../services/userServices';

function RecoverFormController() {
    const [form, setForm] = useState({
        email: '',
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
        const { error } = await requestReset(form);
        if (error) {
            setError(error);
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
