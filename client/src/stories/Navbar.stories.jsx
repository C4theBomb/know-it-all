import { rest } from 'msw';

import { ModeProvider, UserContext } from '../contexts';
import { Navbar } from '../controllers';

export default {
    title: 'Layout/Navbar',
    component: Navbar,
    parameters: {
        msw: {
            handlers: [
                rest.post(`${process.env.REACT_APP_API_ROOT}/auth/logout`, (req, res, ctx) => {
                    return res(ctx.json({}));
                }),
            ],
        },
    },
};

const Template = (args) => (
    <UserContext.Provider
        value={{
            setUserData: () => {},
            userData: args,
        }}
    >
        <ModeProvider>
            <Navbar />
        </ModeProvider>
    </UserContext.Provider>
);

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    email: 'test.user@test.com',
};

export const LoggedOut = Template.bind({});
