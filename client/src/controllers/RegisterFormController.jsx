import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { RegisterForm } from '../components';
import { useError } from '../contexts';
import { register } from '../services/userServices';

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

        try {
            await register({ ...filteredForm, orgID: params.get('orgID') });
            navigate('/login');
        } catch (error) {
            const message = error.response.data;

            setError(message.error);
        }
    }

    return <RegisterForm {...{ form, handleSubmit, handleChange, error }} />;
}

export default RegisterFormController;
