import { MemberUnit } from '../components';

export default {
    title: 'Components/MemberUnit',
    component: MemberUnit,
    argTypes: {
        onClick: { action: 'playAudio' },
    },
};

const Template = (args) => {
    const { onClick, ...member } = args;
    return <MemberUnit member={member} onClick={onClick} />;
};

export const Primary = Template.bind({});
Primary.args = {
    id: 'fcfce355-7877-4a7f-a762-33ead250daa2',
    firstName: 'Test',
    lastName: 'User',
    nickname: 'TU',
    pronouns: 'they/them',
    email: 'test.user@know-it-all.com',
};
