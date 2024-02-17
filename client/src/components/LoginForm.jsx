import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { Form } from '.';
import { FormSubmit, FormTextField } from './StyledElements';

function Login({ form, handleSubmit, handleChange, handleCheckboxChange, error }) {
    return (
        <Form text='Login' error={error}>
            <form onSubmit={handleSubmit}>
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
                <FormSubmit color='primary' type='submit'>
                    Login
                </FormSubmit>
                <Typography variant='body1'>
                    Dont have an account? <Link to='/register'>Register</Link>
                </Typography>
                <Typography variant='body1'>
                    Forgot your password? <Link to='/recover'>Recover Password</Link>
                </Typography>
            </form>
        </Form>
    );
}

export default Login;
