import { Form } from '.';
import { FormSubmit, FormTextField } from './StyledElements';

function UpdateOrganizationForm({ name, handleSubmit, handleChange }) {
    return (
        <Form text='Rename Organization'>
            <form onSubmit={handleSubmit}>
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
