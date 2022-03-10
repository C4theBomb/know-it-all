import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';

import { Typography, Grid, Stack, Box } from '@mui/material';

import Dashboard from './Dashboard';

function GroupDashboard() {
    const navigate = useNavigate();
    const { groupID } = useParams();

    const [group, setGroup] = useState({
        groupID: '',
        groupName: '',
        groupMembers: [],
        createdAt: '',
    });
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getData() {
            await axios
                .get(
                    `${
                        process.env.DOMAIN_ROOT
                    }/group/${groupID}?token=${Cookies.get('token')}`
                )
                .then((response) => {
                    const res = response.data;
                    setGroup(() => {
                        return {
                            groupID: res.groupID,
                            groupName: res.groupName,
                            groupMembers: res.groupMembers,
                        };
                    });

                    const groupMembers = res.groupMembers.map(
                        (member, index) => {
                            return {
                                id: index,
                                firstName: member.firstName,
                                lastName: member.lastName,
                                nickname: member.nickname,
                                namePronounciation: member.pronounciation,
                                pronouns: member.pronouns,
                                email: member.email,
                            };
                        }
                    );
                    setRows(() => groupMembers);
                })
                .catch((error) => {
                    navigate('/');
                });
        }

        getData();
    });

    return (
        <Dashboard rows={rows}>
            <Typography variant='h6'>Groups/{group.groupName}</Typography>
            <Box sx={{ marginTop: '1vh' }}>
                <Grid container columns={{ xs: 3, md: 12 }}>
                    <Grid item xs={3}>
                        <Stack spacing={2}>
                            <Typography variant='body1'>
                                Group ID: {group.groupID}
                            </Typography>
                            <Typography variant='body1'>
                                Members: {group.groupMembers.length}
                            </Typography>
                            <Typography variant='body1'>
                                Created On: {group.createdAt}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Dashboard>
    );
}

export default GroupDashboard;
