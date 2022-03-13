import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

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

import Dashboard from '../utils/Dashboard';

function OrgDashboard() {
    const { orgID } = useParams();
    const navigate = useNavigate();

    const [org, setOrg] = useState({});
    const [rows, setRows] = useState([]);
    const [status, setStatus] = useState('');
    const [selection, setSelection] = useState();

    const linkStyle = { textDecoration: 'none', color: 'inherit' };

    useEffect(() => {
        async function getData() {
            await axios
                .get(
                    `${
                        process.env.REACT_APP_DOMAIN_ROOT
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
                            createdAt: res.createdAt,
                        };
                    });

                    const orgMembers = res.orgMembers.map((member, index) => {
                        return {
                            id: member.userID,
                            ...member,
                        };
                    });
                    setRows(() => orgMembers);

                    setStatus(() => res.status);
                })
                .catch(() => {
                    navigate('/');
                });
        }

        getData();
    });

    async function handleDelete() {
        await axios
            .delete(`${process.env.REACT_APP_DOMAIN_ROOT}/org/delete`, {
                params: {
                    token: Cookies.get('token'),
                    orgID,
                },
            })
            .then(navigate(''));
    }

    function copyID() {
        navigator.clipboard.writeText(orgID);
    }

    async function removeSelected() {
        const doomedUserIDs = selection.map((row) => row.id);

        await axios.post(
            `${process.env.REACT_APP_DOMAIN_ROOT}/org/${orgID}/delete`,
            {
                token: Cookies.get('token'),
                orgID,
                doomedUserIDs,
            }
        );
    }

    async function leaveOrg() {
        await axios.post(
            `${process.env.REACT_APP_DOMAIN_ROOT}/org/${orgID}/delete`,
            {
                token: Cookies.get('token'),
                orgID,
            }
        );
    }

    return (
        <Dashboard rows={rows} setSelection={setSelection}>
            <Typography variant='h6'>Organizations/{org.orgName}</Typography>
            <Box sx={{ marginTop: '1vh' }}>
                <Grid container columns={{ xs: 3, md: 12 }}>
                    <Grid item xs={3}>
                        <Stack spacing={2}>
                            <Typography variant='body1'>
                                Organization ID: {org.orgID}
                            </Typography>
                            <Typography variant='body1'>
                                Members: {org.orgMembers.length}
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
                            {status && (
                                <React.Fragment>
                                    <ButtonGroup
                                        variant='outlined'
                                        aria-label='outlined button group'
                                    >
                                        <Button color='warning'>
                                            <Link to='update' style={linkStyle}>
                                                Edit {org.orgName}
                                            </Link>
                                        </Button>
                                        <Button
                                            color='error'
                                            onClick={handleDelete}
                                        >
                                            Delete {org.orgName}
                                        </Button>
                                    </ButtonGroup>
                                    <ButtonGroup
                                        variant='outlined'
                                        aria-label='outlined button group'
                                    >
                                        <Button
                                            color='success'
                                            onClick={copyID}
                                        >
                                            Copy Org ID
                                        </Button>
                                        <Button
                                            color='error'
                                            onClick={removeSelected}
                                        >
                                            Remove People
                                        </Button>
                                    </ButtonGroup>
                                </React.Fragment>
                            )}
                            {!status && (
                                <Button color='error' onClick={leaveOrg}>
                                    Leave Org
                                </Button>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Dashboard>
    );
}

export default OrgDashboard;
