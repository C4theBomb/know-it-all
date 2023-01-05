import { Form } from '../components';

export default {
    title: 'Layout/Form',
    component: Form,
    args: {
        text: 'Test Form',
        error: '',
    },
};

const Template = (args) => <Form {...args} />;

export const Primary = Template.bind({});
