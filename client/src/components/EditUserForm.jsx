import React from 'react';
import { Link } from 'react-router-dom';

import { Form } from '.';
import { FormSubmit, FormTextField } from './StyledElements';

function EditUserForm({ form, error, handleSubmit, handleChange }) {
    const linkStyle = { textDecoration: 'none', color: 'inherit' };

    return (
        <Form text='Update Account Details' error={error}>
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
                    required
                    label='Pronouns'
                    name='pronouns'
                    onChange={handleChange}
                    value={form.pronouns}
                />
                <FormSubmit color='primary' type='submit'>
                    Update Details
                </FormSubmit>
                <FormSubmit color='error' type='button'>
                    <Link to='/recover' style={linkStyle}>
                        Reset Your Password
                    </Link>
                </FormSubmit>
            </form>
        </Form>
    );
}

export default EditUserForm;
