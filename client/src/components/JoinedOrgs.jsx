import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';

import { Paper, Typography, Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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

function JoinedOrgs() {
    const theme = useTheme();

    const [orgs, setOrgs] = useState([]);

    useEffect(() => {
        async function getOrgs() {
            axios
                .get(
                    `${process.env.DOMAIN_ROOT}/auth/orgs?token=${Cookies.get(
                        'token'
                    )}`
                )
                .then((response) => {
                    setOrgs(() =>
                        response.data.map((org) => {
                            return {
                                orgID: org.orgID,
                                orgName: org.orgName,
                                memberCount: org.memberCount,
                                orgCreatedAt: org.createdAt,
                            };
                        })
                    );
                });
        }

        getOrgs();
    });

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

export default JoinedOrgs;
