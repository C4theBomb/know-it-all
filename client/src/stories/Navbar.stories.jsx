import { Navbar } from '../components';

export default {
    title: 'Layout/Navbar/Navbar',
    component: Navbar,
    argTypes: {
        mode: { options: ['light', 'dark'], control: { type: 'radio' } },
        logout: { action: 'logout' },
        toggleMode: { action: 'toggleMode' },
    },
};

const Template = (args) => <Navbar {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    userData: {
        username: 'User 1',
    },
};

export const LoggedOut = Template.bind({});
