import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';

import {
    Box,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

import Form from '../utils/Form';

function Login({ setToken }) {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [error, setError] = useState('');

    useEffect(() => {
        async function logout() {
            await axios
                .post(`${process.env.REACT_APP_API_ROOT}/auth/logout`, {
                    token: Cookies.get('token'),
                })
                .catch((e) => {
                    console.log(e);
                });

            Cookies.remove('token');
            Cookies.remove('userID');

            setToken(() => false);
        }

        if (Cookies.get('token')) {
            logout();
        }
    }, [setToken]);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm((form) => {
            return { ...form, [name]: value };
        });
    }

    function handleCheckboxChange(e) {
        const name = e.target.name;
        const checked = e.target.checked;

        setForm(() => {
            return { ...form, [name]: checked };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await axios
            .post(`${process.env.REACT_APP_API_ROOT}/auth/login`, form)
            .then((response) => {
                Cookies.set('token', response.data.token, {
                    expires: form.remember ? 3650 : 1,
                });
                Cookies.set('userID', response.data.userID, {
                    expires: form.remember ? 3650 : 1,
                });
                setToken(true);
                navigate('/');
            })
            .catch((e) => setError(() => e.response.data));
    }

    return (
        <Form>
            <form onSubmit={handleSubmit}>
                <Typography variant='h4' sx={{ marginTop: '1vh 0vh' }}>
                    Login
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
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <FormControlLabel
                        control={<Checkbox checked={form.remember} />}
                        labelPlacement='start'
                        label='Remember me'
                        name='remember'
                        onChange={handleCheckboxChange}
                    />
                </div>
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
                >
                    Login
                </Button>
                <Typography variant='body1'>
                    Dont have an account? <Link to='/register'>Register</Link>
                </Typography>
                <Typography variant='body1'>
                    Forgot your password?{' '}
                    <Link to='/recover'>Recover Password</Link>
                </Typography>
            </form>
        </Form>
    );
}

export default Login;
