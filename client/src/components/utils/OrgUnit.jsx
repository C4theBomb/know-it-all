import React from 'react';
import { Link } from 'react-router-dom';

import { Stack, Box, Typography } from '@mui/material';

function OrgUnit({ org }) {
    const { orgID, orgName, memberCount, createdAt } = org;

    return (
        <React.Fragment>
            <Typography variant='h6'>
                <Link to={orgID}>Name: {orgName}</Link>
            </Typography>
            <Box>
                <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
                    <Typography variant='body1'>
                        Members: {memberCount}
                    </Typography>
                    <Typography variant='body1'>
                        Created On: {createdAt}
                    </Typography>
                </Stack>
            </Box>
        </React.Fragment>
    );
}

export default OrgUnit;
