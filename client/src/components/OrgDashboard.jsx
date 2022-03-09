import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    Typography,
    Grid,
    Stack,
    Box,
    ButtonGroup,
    Button,
} from '@mui/material';

import Dashboard from './Dashboard';

function OrgDashboard() {
    const [org, setOrg] = useState({
        orgID: '',
        orgName: '',
        orgOwner: {
            firstName: '',
            lastName: '',
            email: '',
        },
        orgMembers: [],
    });
    const [rows, setRows] = useState([]);
    const { orgID } = useParams();

    useEffect(() => {
        async function getData() {
            await axios
                .get(
                    `${
                        process.env.DOMAIN_ROOT
                    }/org/${orgID}?token=${Cookies.get('token')}`
                )
                .then((response) => {
                    const res = response.data;
                    setOrg(() => {
                        return {
                            orgID: res.orgID,
                            orgName: res.orgName,
                            orgOwner: {
                                firstName: res.orgOwner.firstName,
                                lastName: res.orgOwner.lastName,
                                email: res.orgOwner.email,
                            },
                            orgMembers: res.orgMembers,
                        };
                    });

                    const orgMembers = res.orgMembers.map((member, index) => {
                        return {
                            id: index,
                            firstName: member.firstName,
                            lastName: member.lastName,
                            nickname: member.nickname,
                            namePronounciation: member.pronounciation,
                            pronouns: member.pronouns,
                            email: member.email,
                        };
                    });
                    setRows(() => orgMembers);
                });
        }

        getData();
    });

    return (
        <Dashboard rows={rows}>
            <Typography variant='h6'>Organizations/{org.orgName}</Typography>
            <Box sx={{ marginTop: '1vh' }}>
                <Grid container columns={{ xs: 3, md: 12 }}>
                    <Grid item xs={3}>
                        <Stack spacing={2}>
                            <Typography variant='body1'>
                                Organization ID: {org.orgID}
                            </Typography>
                            <Typography variant='body1'>
                                Members: {org.orgMembers}
                            </Typography>
                            <Typography variant='body1'>
                                Created On: {org.createdAt}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs>
                        <Stack spacing={2}>
                            <Typography variant='body1'>
                                Owner:{' '}
                                {`${org.orgOwner.firstName} ${org.orgOwner.lastName}`}
                            </Typography>
                            <Typography variant='body1'>
                                Email: {org.orgOwner.email}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid
                        item
                        container
                        direction='row'
                        justifyContent='flex-end'
                        alignItems='flex-end'
                        xs
                    >
                        <Stack spacing={2} alignItems='flex-end'>
                            <ButtonGroup
                                variant='outlined'
                                aria-label='outlined button group'
                            >
                                <Button color='warning'>
                                    Edit {org.orgName}
                                </Button>
                                <Button color='error'>
                                    Delete {org.orgName}
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup
                                variant='outlined'
                                aria-label='outlined button group'
                            >
                                <Button color='primary'>Refresh</Button>
                                <Button color='success'>Add People</Button>
                                <Button color='error'>Remove People</Button>
                            </ButtonGroup>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Dashboard>
    );
}

export default OrgDashboard;
