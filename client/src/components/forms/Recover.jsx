import React, { useState } from 'react';
import axios from 'axios';

import { Box, Typography, TextField, Button } from '@mui/material';

function Recover() {
    const [form, setForm] = useState({
        email: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm((form) => {
            return { ...form, [name]: value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await axios
            .get(`${process.env.REACT_APP_API_ROOT}/auth/reset-password`, {
                params: {
                    email: form.email,
                },
            })
            .then((response) => {
                setSuccess(() => response.data);
            })
            .catch((e) => setError(() => e.response.data));
    }

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant='h4' sx={{ marginTop: '1vh 0vh' }}>
                Recover my Password
            </Typography>
            <TextField
                required
                fullWidth
                label='Email'
                name='email'
                variant='outlined'
                onChange={handleChange}
                value={form.email}
                sx={{ margin: '1vh 0vh' }}
            />
            {error && (
                <Box textAlign='right'>
                    <Typography variant='body2' color='error'>
                        {error}
                    </Typography>
                </Box>
            )}
            {success && (
                <Box textAlign='right'>
                    <Typography variant='body2' color='primary'>
                        {success}
                    </Typography>
                </Box>
            )}
            <Button
                variant='contained'
                color='primary'
                sx={{ margin: '1vh 0vh' }}
                type='submit'
                fullWidth
            >
                Recover my password
            </Button>
        </form>
    );
}

export default Recover;
