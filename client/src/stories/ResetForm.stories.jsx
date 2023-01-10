import { rest } from 'msw';

import { ResetForm } from '../controllers';
import { ErrorProvider } from '../contexts';

export default {
    title: 'Forms/Reset Password',
    component: ResetForm,
};

const Template = (args) => (
    <ErrorProvider>
        <ResetForm {...args} />
    </ErrorProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {
    msw: {
        handlers: [
            rest.patch(
                `${process.env.REACT_APP_API_ROOT}/auth/reset/undefined`,
                (req, res, ctx) => {
                    return res(ctx.status(200));
                }
            ),
        ],
    },
};
