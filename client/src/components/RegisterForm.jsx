import React from 'react';
import { Link } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';

import Form from './Form';
import { FormSubmit, FormTextField } from './StyledElements';

function RegisterForm({ form, handleSubmit, handleChange, error }) {
    return (
        <Form text='Create an Account'>
            <form onSubmit={handleSubmit}>
                <FormTextField
                    required
                    label='First Name'
                    name='firstName'
                    onChange={handleChange}
                    value={form.firstName}
                />
                <FormTextField
                    required
                    label='Last Name'
                    name='lastName'
                    onChange={handleChange}
                    value={form.lastName}
                />
                <FormTextField
                    required
                    label='Email'
                    name='email'
                    onChange={handleChange}
                    value={form.email}
                />
                <FormTextField
                    fullWidth
                    label='Pronouns'
                    name='pronouns'
                    onChange={handleChange}
                    value={form.pronouns}
                />
                <TextField
                    required
                    label='Password'
                    name='password'
                    onChange={handleChange}
                    value={form.password}
                    other={{ type: 'password' }}
                />
                <TextField
                    required
                    label='Confirm Password'
                    name='confirmPassword'
                    onChange={handleChange}
                    value={form.confirmPassword}
                    other={{ type: 'password' }}
                />
                {error && (
                    <Box textAlign='right'>
                        <Typography variant='body2' color='secondary'>
                            {error}
                        </Typography>
                    </Box>
                )}
                <FormSubmit
                    color='primary'
                    type='submit'
                    other={{ disabled: form.password !== form.confirmPassword }}
                >
                    Create an Account
                </FormSubmit>
                <Typography variant='body1'>
                    Already have an account? <Link to='/login'>Login</Link>
                </Typography>
            </form>
        </Form>
    );
}

export default RegisterForm;
