import { Form } from '.';
import { FormSubmit, FormTextField } from './StyledElements';

function ResetForm({ form, handleSubmit, handleChange, error }) {
    return (
        <Form text='Reset Password' error={error}>
            <form onSubmit={handleSubmit}>
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
                <FormSubmit
                    color='primary'
                    type='submit'
                    other={{ disabled: form.password !== form.confirmPassword }}
                >
                    Reset my Password
                </FormSubmit>
            </form>
        </Form>
    );
}

export default ResetForm;
