import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import axios from 'axios';

import { Box, Typography, TextField, Button } from '@mui/material';

import Form from '../utils/Form';

function Register() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        pronouns: '',
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

        const { confirmPassword, ...filteredForm } = form;
        await axios
            .post(`${process.env.REACT_APP_API_ROOT}/auth/register`, {
                ...filteredForm,
                orgID: params.orgID,
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
                    Create an Account
                </Typography>
                <TextField
                    required
                    fullWidth
                    label='First Name'
                    name='firstName'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.firstName}
                    sx={{ margin: '1vh 0vh' }}
                />
                <TextField
                    required
                    fullWidth
                    label='Last Name'
                    name='lastName'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.lastName}
                    sx={{ margin: '1vh 0vh' }}
                />
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
                <TextField
                    fullWidth
                    label='Pronouns'
                    name='pronouns'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.pronouns}
                    sx={{ margin: '1vh 0vh' }}
                />
                <TextField
                    required
                    fullWidth
                    label='Password'
                    name='password'
                    type='password'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.password}
                    sx={{ margin: '1vh 0vh' }}
                />
                <TextField
                    required
                    fullWidth
                    label='Confirm Password'
                    name='confirmPassword'
                    type='password'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.confirmPassword}
                    sx={{ margin: '1vh 0vh' }}
                />
                {error && (
                    <Box textAlign='right'>
                        <Typography variant='body2' color='secondary'>
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
                    Create an Account
                </Button>
                <Typography variant='body1'>
                    Already have an account? <Link to='/login'>Login</Link>
                </Typography>
            </form>
        </Form>
    );
}

export default Register;
