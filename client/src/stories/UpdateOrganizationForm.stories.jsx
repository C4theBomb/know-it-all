import { rest } from 'msw';

import { UpdateOrganizationForm } from '../controllers';
import { ErrorProvider } from '../contexts';

export default {
    title: 'Forms/Update Organization',
    component: UpdateOrganizationForm,
};

const Template = (args) => (
    <ErrorProvider>
        <UpdateOrganizationForm {...args} />
    </ErrorProvider>
);

export const Primary = Template.bind({});
Primary.parameters = {
    msw: {
        handlers: [
            rest.patch(`${process.env.REACT_APP_API_ROOT}/org/undefined`, (req, res, ctx) => {
                return res(ctx.status(200));
            }),
        ],
    },
};
