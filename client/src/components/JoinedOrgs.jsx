import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import OrgUnit from './OrgUnit';

function JoinedOrgs() {
    const [orgs, setOrgs] = useState([]);
    const theme = useTheme();

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
