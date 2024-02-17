import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EditUserForm } from '../components';
import { useUser } from '../contexts';
import { createRequest } from '../utils/requests';

function EditUserFormController() {
    const navigate = useNavigate();
    const { userData } = useUser();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        pronouns: '',
    });

    const [error, setError] = useState('');

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm((form) => ({ ...form, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const instance = createRequest();
            await instance.post('/auth/update', form);
            navigate('/');
        } catch (error) {
            setError(() => error.response.data);
        }
    }

    useEffect(() => {
        setForm(() => ({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            pronouns: userData.pronouns,
        }));
    }, [userData]);

    return (
        <EditUserForm
            form={form}
            error={error}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
        />
    );
}

export default EditUserFormController;
