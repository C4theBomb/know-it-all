import { rest } from 'msw';

import { RecoverForm } from '../controllers';
import { ErrorProvider } from '../contexts';

export default {
    title: 'Forms/Recover Password',
    component: RecoverForm,
};

const Template = (args) => (
    <ErrorProvider>
        <RecoverForm {...args} />
    </ErrorProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {
    msw: {
        handlers: [
            rest.post(`${process.env.REACT_APP_API_ROOT}/auth/reset/undefined`, (req, res, ctx) => {
                return res(ctx.status(200));
            }),
        ],
    },
};
