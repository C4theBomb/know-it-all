import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';

import { Typography, TextField, Button } from '@mui/material';

import Form from '../utils/Form';

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
        <Form>
            <form onSubmit={handleSubmit}>
                <Typography variant='h4' sx={{ marginTop: '1vh 0vh' }}>
                    Rename Organization
                </Typography>
                <TextField
                    required
                    fullWidth
                    label='Name'
                    name='name'
                    variant='outlined'
                    onChange={handleChange}
                    value={name}
                    sx={{ margin: '1vh 0vh' }}
                />
                <Button
                    variant='contained'
                    color='primary'
                    sx={{ margin: '1vh 0vh' }}
                    type='submit'
                    fullWidth
                >
                    Rename
                </Button>
            </form>
        </Form>
    );
}

export default UpdateOrganization;
