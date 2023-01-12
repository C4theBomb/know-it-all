import { Stack, Box } from '@mui/material';

import { StackItem } from '../components';
import { ErrorProvider } from '../contexts';

export default {
    title: 'Components/Stack Item',
    component: StackItem,
    args: {
        text: 'Default Text',
    },
};

export const Single = (args) => (
    <ErrorProvider>
        <Stack spacing={2} sx={{ padding: 2 }}>
            <StackItem {...args} />
        </Stack>
    </ErrorProvider>
);

export const Multiple = (args) => (
    <ErrorProvider>
        <Stack spacing={2} sx={{ padding: 2 }}>
            <StackItem {...args} />
            <StackItem {...args} />
            <StackItem {...args} />
            <StackItem {...args} />
        </Stack>
    </ErrorProvider>
);
