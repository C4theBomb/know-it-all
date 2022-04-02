import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';

import { Box, Typography, TextField, Button } from '@mui/material';

import Form from '../utils/Form';
import RecordMp3 from '../utils/RecordMp3';

function EditUser() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        pronouns: '',
    });
    const [error, setError] = useState('');

    const linkStyle = { textDecoration: 'none', color: 'inherit' };

    useEffect(() => {
        async function getInfo() {
            axios
                .get(
                    `${process.env.REACT_APP_API_ROOT}/auth/${Cookies.get(
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
                            pronouns: user.pronouns,
                        };
                    });
                });
        }
        getInfo();
    }, []);

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
            .patch(`${process.env.REACT_APP_API_ROOT}/auth/update`, {
                ...form,
                token: Cookies.get('token'),
            })
            .then(() => {
                navigate('/');
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
            <RecordMp3 />
        </Form>
    );
}

export default EditUser;
