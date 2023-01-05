import { LoginForm } from '../components';

export default {
    title: 'Forms/LoginForm',
    component: LoginForm,
    args: {
        form: {
            email: '',
            password: '',
            remember: false,
        },
        error: '',
    },
    argTypes: {
        handleSubmit: { action: 'submit' },
        handleChange: { action: 'inputChange' },
        handleCheckboxChange: { action: 'checkboxToggle' },
    },
};

const Template = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
