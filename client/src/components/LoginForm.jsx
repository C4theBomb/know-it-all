import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

import Form from '../Form';
import { FormSubmit, FormTextField } from '../StyledElements';

function Login({
    form,
    error,
    handleSubmit,
    handleChange,
    handleCheckboxChange,
}) {
    return (
        <Form>
            <form onSubmit={handleSubmit}>
                <Typography variant='h4' sx={{ marginTop: '1vh 0vh' }}>
                    Login
                </Typography>
                <FormTextField
                    required
                    label='Email'
                    name='email'
                    onChange={handleChange}
                    value={form.email}
                />
                <FormTextField
                    required
                    label='Password'
                    name='password'
                    onChange={handleChange}
                    value={form.password}
                    other={{ type: 'password' }}
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
                <FormSubmit color='primary' type='submit'>
                    Login
                </FormSubmit>
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
