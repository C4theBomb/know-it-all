import React from 'react';

import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function StackItem({ text, children }) {
    const theme = useTheme();

    const paperStyle = {
        ...theme.typography.body2,
        padding: '2vh',
        color: theme.palette.text.secondary,
    };

    return (
        <Paper sx={paperStyle}>
            <Typography variant='h6'>{text}</Typography>
            {children}
        </Paper>
    );
}

export default StackItem;
