import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ResetForm } from '../components';
import { resetPassword } from '../services/userServices';
import { useError } from '../contexts';

function ResetFormController() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
    });
    const { error, setError } = useError();

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm((form) => {
            return { ...form, [name]: value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const error = await resetPassword(id, { password: form.password });

        if (error) {
            setError(() => error);
        } else {
            navigate('/login');
        }
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

export default ResetFormController;
