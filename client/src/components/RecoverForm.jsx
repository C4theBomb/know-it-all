import { Form } from '.';
import { FormSubmit, FormTextField } from './StyledElements';

function RecoverForm({ form, error, handleSubmit, handleChange }) {
    return (
        <Form text='Recover Password' error={error}>
            <form onSubmit={handleSubmit}>
                <FormTextField
                    required
                    label='Email'
                    name='email'
                    onChange={handleChange}
                    value={form.email}
                />
                <FormSubmit color='primary' type='submit'>
                    Recover my password
                </FormSubmit>
            </form>
        </Form>
    );
}

export default RecoverForm;
