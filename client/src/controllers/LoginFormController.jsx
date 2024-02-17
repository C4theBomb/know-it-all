import { Buffer } from 'buffer';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../components';
import { useError, useUser } from '../contexts';
import { createRequest } from '../utils/requests';

function LoginFormController({ setToken }) {
    const navigate = useNavigate();
    const { error, setError } = useError();
    const { setUserData } = useUser();

    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: false,
    });

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

        const encoded = Buffer.from(`${form.email}:${form.password}`).toString('base64');

        const instance = createRequest();
        instance.defaults.headers.common['Authorization'] = `basic ${encoded}`;

        try {
            const response = await instance.post('/auth/login', { remember: form.remember });
            const expires = form.remember ? 365 : 1;

            setUserData(() => response.data.user);
            Cookies.set('token', response.data.token, { expires });

            navigate('/');
        } catch (error) {
            setError(() => error.response.data);
        }
    }

    return <LoginForm {...{ form, handleSubmit, handleChange, handleCheckboxChange, error }} />;
}

export default LoginFormController;
