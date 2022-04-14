import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import UpdateOrganizationForm from '../components/UpdateOrganizationForm';

function UpdateOrganization() {
    const { orgID } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');

    function handleChange(e) {
        const value = e.target.value;

        setName(() => value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await axios
            .patch(`${process.env.REACT_APP_API_ROOT}/org/update`, {
                token: Cookies.get('token'),
                orgName: name,
                orgID,
            })
            .then(() => {
                navigate(`/org/${orgID}`);
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

export default UpdateOrganization;
