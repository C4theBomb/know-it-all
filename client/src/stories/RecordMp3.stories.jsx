import { rest } from 'msw';

import { RecordMp3 } from '../controllers';
import { UserContext } from '../contexts';

export default {
    title: 'Forms/RecordMp3',
    component: RecordMp3,
};

const Template = (args) => (
    <UserContext.Provider
        value={{
            setUserData: () => {},
            userData: args,
        }}
    >
        <RecordMp3 />
    </UserContext.Provider>
);

export const Primary = Template.bind({});
Primary.args = {
    id: 'test-id',
};
Primary.parameters = {
    msw: {
        handlers: [
            rest.get(
                `${process.env.REACT_APP_DOMAIN_ROOT}/public/audio/test-id.mp3`,
                (req, res, ctx) => {
                    return res(ctx.status(404));
                }
            ),
            rest.post(`${process.env.REACT_APP_API_ROOT}/auth/audio`, (req, res, ctx) => {
                return res(ctx.status(200));
            }),
        ],
    },
};
