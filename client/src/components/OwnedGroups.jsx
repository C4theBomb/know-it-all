import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import GroupUnit from './GroupUnit';

function JoinedOrgs() {
    const [groups, setGroups] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        async function getGroups() {
            axios
                .get(
                    `${process.env.DOMAIN_ROOT}/auth/orgs?token=${Cookies.get(
                        'token'
                    )}`
                )
                .then((response) => {
                    setGroups(() =>
                        response.data.map((group) => {
                            return {
                                groupID: group.groupID,
                                groupName: group.groupName,
                                memberCount: group.memberCount,
                                groupCreatedAt: group.createdAt,
                            };
                        })
                    );
                });
        }

        getGroups();
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
            <Typography variant='h6'>Groups</Typography>
            <Box sx={{ overflowY: 'auto' }}>
                {groups.map((group) => (
                    <GroupUnit group={group} />
                ))}
            </Box>
        </Paper>
    );
}

export default JoinedOrgs;
