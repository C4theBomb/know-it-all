import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ResetForm } from '../components';
import { useError } from '../contexts';
import { createRequest } from '../utils/requests';

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

        try {
            const instance = createRequest();
            await instance.patch(`/reset/${id}`);
            navigate('/login');
        } catch (error) {
            setError(() => error.response.data);
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
