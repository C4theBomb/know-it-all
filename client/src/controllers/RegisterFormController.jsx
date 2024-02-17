import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import RegisterForm from '../components/RegisterForm';
import { useError } from '../contexts';
import { createRequest } from '../utils/requests';

function RegisterFormController() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { error, setError } = useError();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        pronouns: '',
        password: '',
        confirmPassword: '',
    });

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
        const fullForm = { ...filteredForm, orgID: params.get('orgID') };

        try {
            const instance = createRequest();
            await instance.post('/auth/register', fullForm);
            navigate('/login');
        } catch (error) {
            setError(() => error.response.data);
        }
    }

    return <RegisterForm {...{ form, handleSubmit, handleChange, error }} />;
}

export default RegisterFormController;
