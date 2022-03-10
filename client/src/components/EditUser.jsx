import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';

import { Box, Typography, TextField, Button } from '@mui/material';

import Form from './Form';

function EditUser() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        pronouns: '',
        ethnicity: '',
    });
    const [error, setError] = useState('');

    const linkStyle = { textDecoration: 'none', color: 'inherit' };

    useEffect(() => {
        async function getInfo() {
            axios
                .get(
                    `${process.env.DOMAIN_ROOT}/auth/${Cookies.get(
                        'userID'
                    )}?token=${Cookies.get('token')}`
                )
                .then((response) => {
                    const user = response.data;

                    setForm(() => {
                        return {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            gender: user.gender,
                            pronouns: user.pronouns,
                            ethnicity: user.ethnicity,
                        };
                    });
                });
        }
        getInfo();
    });

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
            .post(`${process.env.DOMAIN_ROOT}/auth/register`, filteredForm)
            .then(() => {
                navigate('/login');
            })
            .catch((e) => setError(() => e.response.data));
    }

    return (
        <Form>
            <form onSubmit={handleSubmit}>
                <Typography variant='h4' sx={{ marginTop: '1vh 0vh' }}>
                    Update Account Details
                </Typography>
                <TextField
                    required
                    fullWidth
                    id='outline-required'
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
                    id='outline-required'
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
                    id='outline-required'
                    label='Email'
                    name='email'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.email}
                    sx={{ margin: '1vh 0vh' }}
                />
                <TextField
                    fullWidth
                    id='outline-required'
                    label='Ethnicity'
                    name='ethnicity'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.ethnicity}
                    sx={{ margin: '1vh 0vh' }}
                />
                <TextField
                    fullWidth
                    id='outline-required'
                    label='Gender'
                    name='gender'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.gender}
                    sx={{ margin: '1vh 0vh' }}
                />
                <TextField
                    fullWidth
                    id='outline-required'
                    label='Pronouns'
                    name='pronouns'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.pronouns}
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
                >
                    Update Details
                </Button>
                <Button
                    variant='contained'
                    color='error'
                    sx={{ margin: '1vh 0vh' }}
                    fullWidth
                >
                    <Link to='/recover' style={linkStyle}>
                        Reset Your Password
                    </Link>
                </Button>
            </form>
        </Form>
    );
}

export default EditUser;
