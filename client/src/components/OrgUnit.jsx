import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';

function OrgUnit({ org }) {
    const { orgID, orgName, memberCount, orgCreatedAt } = org;

    return (
        <React.Fragment>
            <Link to={orgID}>Name: {orgName}</Link>
            <Box>
                <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
                    <Typography variant='body1'>
                        Members: {memberCount}
                    </Typography>
                    <Typography variant='body1'>
                        Created On: {orgCreatedAt}
                    </Typography>
                </Stack>
            </Box>
        </React.Fragment>
    );
}

export default OrgUnit;
