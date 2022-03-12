import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { Box, Typography, TextField, Button } from '@mui/material';

import Form from '../utils/Form';

function Reset() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
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
        await axios
            .patch(`${process.env.DOMAIN_ROOT}/auth/reset-password/${id}`, {
                password: form.password,
            })
            .then(() => {
                navigate('/login');
            })
            .catch((e) => setError(() => e.response.data));
    }

    return (
        <Form>
            <form onSubmit={handleSubmit}>
                <Typography variant='h4' sx={{ marginTop: '1vh 0vh' }}>
                    Reset my Password
                </Typography>
                <TextField
                    required
                    fullWidth
                    id='outline-required'
                    label='Password'
                    name='password'
                    variant='outlined'
                    type='password'
                    onChange={handleChange}
                    value={form.password}
                    sx={{ margin: '1vh 0vh' }}
                />
                <TextField
                    required
                    fullWidth
                    id='outline-required'
                    label='Confirm Password'
                    name='confirmPassword'
                    variant='outlined'
                    type='password'
                    onChange={handleChange}
                    value={form.confirmPassword}
                    sx={{ margin: '1vh 0vh' }}
                />
                {error && (
                    <Box textAlign='right'>
                        <Typography variant='body2' color='error'>
                            {error}
                        </Typography>
                    </Box>
                )}
                <Button
                    variant='contained'
                    color='primary'
                    sx={{ margin: '1vh 0vh' }}
                    type='submit'
                    fullWidth
                    disabled={form.password !== form.confirmPassword}
                >
                    Reset my Password
                </Button>
            </form>
        </Form>
    );
}

export default Reset;
