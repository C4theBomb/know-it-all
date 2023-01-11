import { rest } from 'msw';

import { MainPageDisplay } from '../controllers';
import { ErrorProvider } from '../contexts';

export default {
    title: 'Pages/Main Page',
    component: MainPageDisplay,
    parameters: {
        msw: {
            handlers: [
                rest.get(`${process.env.REACT_APP_API_ROOT}/auth/orgs`, (req, res, ctx) => {
                    return res(
                        ctx.json({
                            orgs: [
                                {
                                    id: 'fcfce355-7877-4a7f-a762-33ead250daa2',
                                    name: 'Test Org Owned',
                                    memberCount: 42,
                                    createdAt: 1672202132563,
                                },
                            ],
                        })
                    );
                }),
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
                rest.post(`${process.env.REACT_APP_API_ROOT}/org/*/add`, (req, res, ctx) => {
                    return res(ctx.status(200));
                }),
                rest.post(`${process.env.REACT_APP_API_ROOT}/org`, (req, res, ctx) => {
                    return res(ctx.status(200));
                }),
            ],
        },
    },
};

const Template = (args) => (
    <ErrorProvider>
        <MainPageDisplay {...args} />
    </ErrorProvider>
);

export const WithOrganizations = Template.bind({});
WithOrganizations.parameters = {
    cookie: {
        token: 'testtoken',
    },
};

export const WithoutOrganizations = Template.bind({});
