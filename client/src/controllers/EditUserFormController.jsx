import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { EditUserForm } from '../components';
import { useUser } from '../contexts';
import { updateUserDetails } from '../services/userServices';

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

        setForm((form) => {
            return { ...form, [name]: value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await updateUserDetails(form);
            navigate('/');
        } catch (error) {
            const message = error.response.data;

            setError(() => message.error);
        }
    }

    useEffect(() => {
        if (!userData.loading) {
            setForm(() => ({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                pronouns: userData.pronouns,
            }));
        }
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
