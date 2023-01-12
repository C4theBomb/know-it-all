import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UpdateOrganizationForm } from '../components';
import { updateOrgDetails } from '../services/orgServices';

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

        await updateOrgDetails(orgID, { orgName: name })
            .then(() => {
                navigate(`/org/${orgID}`);
            })
            .catch((e) => {
                console.error(e.response.data.error);
            });
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
