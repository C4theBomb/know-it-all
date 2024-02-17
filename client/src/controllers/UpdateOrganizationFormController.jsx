import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UpdateOrganizationForm } from '../components';
import { createRequest } from '../utils/requests';

function UpdateOrganizationFormController() {
    const { orgID } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');

    function handleChange(e) {
        const value = e.target.value;

        setName(() => value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const instance = createRequest();
        await instance.patch(`/org/${orgID}`, { orgName: name });
        navigate(`/org/${orgID}`);
    }

    return (
        <UpdateOrganizationForm
            name={name}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
        />
    );
}

export default UpdateOrganizationFormController;
