import { OrgUnit } from '../components';

export default {
    title: 'Components/OrgUnit',
    component: OrgUnit,
};

const Template = (args) => <OrgUnit org={args} />;

export const Primary = Template.bind({});
Primary.args = {
    id: 'fcfce355-7877-4a7f-a762-33ead250daa2',
    name: 'Test Org',
    memberCount: 42,
    createdAt: 1672202132563,
};
