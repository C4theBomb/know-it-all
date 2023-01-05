import { MemberUnit } from '../components';

export default {
    title: 'MemberUnit',
    component: MemberUnit,
    argTypes: {
        onClick: { action: 'playAudio' },
    },
};

const Template = (args) => <MemberUnit {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    member: {
        id: 'fcfce355-7877-4a7f-a762-33ead250daa2',
        firstName: 'Test',
        lastName: 'User',
        nickname: 'TU',
        pronouns: 'they/them',
        email: 'test.user@know-it-all.com',
    },
};
