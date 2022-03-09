import React, { useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function JoinedOrgs() {
    const theme = useTheme();

    return (
        <Paper
            sx={{
                ...theme.typography.body2,
                padding: '2vh',
                color: theme.palette.text.secondary,
                flexGrow: 1,
                height: '89vh',
                margin: '2vh',
            }}
        >
            <Typography variant='h6'>Organizations</Typography>
        </Paper>
    );
}

export default JoinedOrgs;
