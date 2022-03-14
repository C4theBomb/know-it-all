import React, { useEffect, useState } from 'react';

import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import OrgUnit from './OrgUnit';

function Organizations({ retrieveOrgs }) {
    const theme = useTheme();

    const [orgs, setOrgs] = useState([]);

    useEffect(() => {
        retrieveOrgs(setOrgs);
    }, [retrieveOrgs]);

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
            <Box sx={{ overflowY: 'auto' }}>
                {orgs.map((org) => (
                    <OrgUnit org={org} />
                ))}
            </Box>
        </Paper>
    );
}

export default Organizations;
