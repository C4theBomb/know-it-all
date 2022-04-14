import React from 'react';
import { Typography } from '@mui/material';

import Form from './Form';
import { FormSubmit, FormTextField } from './StyledElements';

function UpdateOrganizationForm({ name, handleSubmit, handleChange }) {
    return (
        <Form text='Rename Organization'>
            <form onSubmit={handleSubmit}>
                <Typography variant='h4' sx={{ marginTop: '1vh 0vh' }}>
                    Rename Organization
                </Typography>
                <FormTextField
                    required
                    label='Name'
                    name='name'
                    onChange={handleChange}
                    value={name}
                />
                <FormSubmit color='primary' type='submit'>
                    Rename
                </FormSubmit>
            </form>
        </Form>
    );
}

export default UpdateOrganizationForm;
