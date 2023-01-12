import { rest } from 'msw';

import { MemberOrgsDashboard } from '../controllers';
import { ErrorProvider } from '../contexts';

export default {
    title: 'Pages/Member Dashboard',
    component: MemberOrgsDashboard,
    parameters: {
        msw: {
            handlers: [
                rest.get(`${process.env.REACT_APP_API_ROOT}/auth/orgs/member`, (req, res, ctx) => {
                    return res(
                        ctx.json({
                            orgs: [
                                {
                                    id: 'fcfce355-7877-4a7f-a762-33ead250daa2',
                                    name: 'Test Org Member',
                                    memberCount: 42,
                                    createdAt: 1672202132563,
                                },
                            ],
                        })
                    );
                }),
            ],
        },
    },
};

const Template = (args) => (
    <ErrorProvider>
        <MemberOrgsDashboard {...args} />
    </ErrorProvider>
);

export const WithOrganizations = Template.bind({});
WithOrganizations.parameters = {
    cookie: {
        token: 'testToken',
    },
};

export const WithoutOrganizations = Template.bind({});
