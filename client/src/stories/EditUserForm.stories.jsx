import { rest } from 'msw';

import { ErrorProvider, UserContext } from '../contexts';
import { EditUserForm } from '../controllers';

export default {
    title: 'Forms/EditUserForm',
    component: EditUserForm,
};

const Template = (args) => (
    <UserContext.Provider
        value={{
            userData: args,
        }}
    >
        <ErrorProvider>
            <EditUserForm />
        </ErrorProvider>
    </UserContext.Provider>
);

export const WithIntialData = Template.bind({});
WithIntialData.args = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test.user@test.com',
    pronouns: 'they/them',
};
WithIntialData.parameters = {
    msw: {
        handlers: [
            rest.post(`${process.env.REACT_APP_API_ROOT}/auth/update`, (req, res, ctx) => {
                return res(ctx.json({}));
            }),
        ],
    },
};
