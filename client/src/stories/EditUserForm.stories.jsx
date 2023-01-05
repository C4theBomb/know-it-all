import { EditUserForm } from '../components';

export default {
    title: 'Forms/EditUserForm',
    component: EditUserForm,
    args: {
        form: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        error: '',
    },
    argTypes: {
        handleSubmit: { action: 'submit' },
        handleChange: { action: 'inputChange' },
    },
};

const Template = (args) => <EditUserForm {...args} />;

export const Primary = Template.bind({});
