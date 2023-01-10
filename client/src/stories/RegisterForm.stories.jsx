import { rest } from 'msw';

import { RegisterForm } from '../controllers';
import { ErrorProvider } from '../contexts';

export default {
    title: 'Forms/RegisterForm',
    component: RegisterForm,
};

const Template = (args) => (
    <ErrorProvider>
        <RegisterForm {...args} />
    </ErrorProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {
    msw: {
        handlers: [
            rest.post(`${process.env.REACT_APP_API_ROOT}/auth/register`, (req, res, ctx) => {
                return res(ctx.status(200));
            }),
        ],
    },
};
