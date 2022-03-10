import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';

function OrgUnit({ group }) {
    const { groupID, groupName, memberCount, groupCreatedAt } = group;

    return (
        <React.Fragment>
            <Link to={groupID}>Name: {groupName}</Link>
            <Box>
                <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
                    <Typography variant='body1'>
                        Members: {memberCount}
                    </Typography>
                    <Typography variant='body1'>
                        Created On: {groupCreatedAt}
                    </Typography>
                </Stack>
            </Box>
        </React.Fragment>
    );
}

export default OrgUnit;
