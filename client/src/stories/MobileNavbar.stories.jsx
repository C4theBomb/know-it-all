import { MobileNavbar } from '../components';

export default {
    title: 'Layout/Navbar/MobileNavbar',
    component: MobileNavbar,
    argTypes: {
        open: { options: [true, false], control: { type: 'boolean' } },
        mode: { options: ['light', 'dark'], control: { type: 'radio' } },
        setOpen: { action: 'setOpen' },
        logout: { action: 'logout' },
        toggleMode: { action: 'toggleMode' },
    },
};

const Template = (args) => <MobileNavbar {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    userData: {
        username: 'User 1',
    },
    open: false,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
    open: false,
};
