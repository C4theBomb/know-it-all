import React, { useState } from 'react';
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
        orgID: '1234',
        orgName: 'Org 1',
        orgOwner: {
            firstName: 'C4',
            lastName: 'Patino',
            email: 'c4patino@gmail.com',
        },
        orgMembers: [],
    });

    const rows = useState([
        {
            id: 1,
            firstName: 'Ceferino',
            lastName: 'Patino',
            nickname: 'C4',
            namePronounciation: '',
            pronouns: 'he/him',
            email: 'c4patino@gmail.com',
        },
    ]);

    return (
        <Dashboard rows={rows}>
            <Typography variant='h6'>Organizations/{org.orgName}</Typography>
            <Box sx={{ marginTop: '1vh' }}>
                <Grid container>
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
