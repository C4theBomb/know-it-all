import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { OrgUnit } from '.';

function OrganizationList({ orgs }) {
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
            <hr />
            <Box sx={{ overflowY: 'auto' }}>
                {orgs.map((org, index) => (
                    <OrgUnit org={org} key={index} />
                ))}
            </Box>
        </Paper>
    );
}

export default OrganizationList;
