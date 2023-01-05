import { RegisterForm } from '../components';

export default {
    title: 'Forms/RegisterForm',
    component: RegisterForm,
    args: {
        form: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        error: '',
    },
    argTypes: {
        handleSubmit: { action: 'submit' },
        handleChange: { action: 'inputChange' },
    },
};

const Template = (args) => <RegisterForm {...args} />;

export const Primary = Template.bind({});
