import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import { Typography, TextField, Button } from '@mui/material';

import Form from '../utils/Form';

function UpdateOrganization() {
    const { orgID } = useParams();

    const [name, setName] = useState('');

    function handleChange(e) {
        const value = e.target.value;

        setName(() => value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await axios.patch(`${process.env.REACT_APP_DOMAIN_ROOT}/org/update`, {
            orgName: name,
            orgID,
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
                    id='outline-required'
                    label='name'
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
