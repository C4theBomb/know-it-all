import React from 'react';
import { Box, Typography } from '@mui/material';

import { FormSubmit, FormTextField } from './StyledElements';

function RecoverForm({ form, error, success, handleSubmit, handleChange }) {
    return (
        <form onSubmit={handleSubmit}>
            <Typography variant='h4' sx={{ marginTop: '1vh 0vh' }}>
                Recover my Password
            </Typography>
            <FormTextField
                required
                label='Email'
                name='email'
                onChange={handleChange}
                value={form.email}
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
            <FormSubmit color='primary' type='submit'>
                Recover my password
            </FormSubmit>
        </form>
    );
}

export default RecoverForm;
