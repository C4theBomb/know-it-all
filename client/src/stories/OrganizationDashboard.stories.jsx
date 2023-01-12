import { rest } from 'msw';

import { OrganizationDashboard } from '../controllers';
import { ErrorProvider } from '../contexts';

export default {
    title: 'Pages/Organization Dashboard',
    component: OrganizationDashboard,
};

const Template = (args) => (
    <ErrorProvider>
        <OrganizationDashboard {...args} />
    </ErrorProvider>
);

export const Owner = Template.bind({});
Owner.parameters = {
    cookie: {
        token: 'testToken',
    },
    msw: {
        handlers: [
            rest.get(`${process.env.REACT_APP_API_ROOT}/org/*`, (req, res, ctx) => {
                return res(
                    ctx.json({
                        org: {
                            id: 'testID',
                            name: 'Test Org',
                            owner: {
                                firstName: 'Test',
                                lastName: 'User',
                                email: 'test.user@test.com',
                            },
                            member: [],
                            createdAt: 1672202132563,
                        },
                        memberCount: 0,
                        owner: true,
                    })
                );
            }),
            rest.delete(`${process.env.REACT_APP_API_ROOT}/org/*`, (req, res, ctx) => {
                return res(ctx.status(200));
            }),
            rest.post(`${process.env.REACT_APP_API_ROOT}/org/*/remove`, (req, res, ctx) => {
                return res(ctx.status(200));
            }),
        ],
    },
};

export const NotOwner = Template.bind({});
NotOwner.parameters = {
    cookie: {
        token: 'testToken',
    },
    msw: {
        handlers: [
            rest.get(`${process.env.REACT_APP_API_ROOT}/org/*`, (req, res, ctx) => {
                return res(
                    ctx.json({
                        org: {
                            id: 'testID',
                            name: 'Test Org',
                            owner: {
                                firstName: 'Test',
                                lastName: 'User',
                                email: 'test.user@test.com',
                            },
                            member: [],
                            createdAt: 1672202132563,
                        },
                        memberCount: 0,
                        owner: false,
                    })
                );
            }),
            rest.post(`${process.env.REACT_APP_API_ROOT}/org/*/remove`, (req, res, ctx) => {
                return res(ctx.status(200));
            }),
        ],
    },
};
