import React from 'react';
import { Box, Typography } from '@mui/material';

import { FormSubmit, FormTextField } from './StyledElements';

function ResetForm({ form, handleSubmit, handleChange, error }) {
    return (
        <form onSubmit={handleSubmit}>
            <Typography variant='h4' sx={{ marginTop: '1vh 0vh' }}>
                Reset my Password
            </Typography>
            <FormTextField
                required
                label='Password'
                name='password'
                onChange={handleChange}
                value={form.password}
                other={{ type: 'password' }}
            />
            <FormTextField
                required
                label='Confirm Password'
                name='confirmPassword'
                onChange={handleChange}
                value={form.confirmPassword}
                other={{ type: 'password' }}
            />
            {error && (
                <Box textAlign='right'>
                    <Typography variant='body2' color='error'>
                        {error}
                    </Typography>
                </Box>
            )}
            <FormSubmit
                color='primary'
                type='submit'
                other={{ disabled: form.password !== form.confirmPassword }}
            >
                Reset my Password
            </FormSubmit>
        </form>
    );
}

export default ResetForm;
