import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';

import {
    Button,
    Typography,
    Box,
    Grid,
    Stack,
    TextField,
    FormGroup,
} from '@mui/material';

import OrgUnit from './utils/OrgUnit';
import StackItem from './utils/StackItem';

function MainPage() {
    const navigate = useNavigate();

    const [ownedOrgs, setOwnedOrgs] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [form, setForm] = useState({
        name: '',
        id: '',
    });

    const linkStyle = { textDecoration: 'none', color: 'inherit' };

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/login');
        }
    });

    useEffect(() => {}, []);

    useEffect(() => {
        getMemberOrgs();
        getOwnedOrgs();
    }, []);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm((form) => {
            return { ...form, [name]: value };
        });
    }

    async function getOwnedOrgs() {
        await axios
            .get(
                `${process.env.REACT_APP_DOMAIN_ROOT}/auth?token=${Cookies.get(
                    'token'
                )}`
            )
            .then((response) => {
                setOwnedOrgs(() =>
                    response.data.map((org) => {
                        return {
                            orgID: org.orgID,
                            orgName: org.orgName,
                            memberCount: org.memberCount,
                            createdAt: org.createdAt,
                        };
                    })
                );
            })
            .catch((e) => {
                console.log(e);
            });
    }

    async function getMemberOrgs() {
        await axios
            .get(
                `${
                    process.env.REACT_APP_DOMAIN_ROOT
                }/auth/orgs?token=${Cookies.get('token')}`
            )
            .then((response) => {
                setOrgs(() =>
                    response.data.map((org) => {
                        return {
                            orgID: org.orgID,
                            orgName: org.orgName,
                            memberCount: org.memberCount,
                            createdAt: org.createdAt,
                        };
                    })
                );
            });
    }

    async function createOrg(e) {
        e.preventDefault();
        console.log('create');

        await axios
            .post(`${process.env.REACT_APP_DOMAIN_ROOT}/org/create`, {
                token: Cookies.get('token'),
                orgName: form.name,
            })
            .then(() => {
                navigate('');
                getOwnedOrgs();
            });
    }

    async function joinOrg(e) {
        e.preventDefault();

        await axios
            .post(`${process.env.REACT_APP_DOMAIN_ROOT}/org/${form.id}/add`, {
                token: Cookies.get('token'),
            })
            .then(() => {
                getMemberOrgs();
            });
    }

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container
                    spacing={2}
                    alignItems='center'
                    style={{ height: '95vh' }}
                >
                    <Grid item xs={1} sm={3} md={3.5} />
                    <Grid item xs={10} sm={6} md={5}>
                        <Stack spacing={2}>
                            <StackItem text='Join an Organization'>
                                <form onSubmit={joinOrg}>
                                    <FormGroup row>
                                        <TextField
                                            label='Organization ID'
                                            name='id'
                                            value={form.id}
                                            onChange={handleChange}
                                            sx={{ width: '75%' }}
                                        />
                                        <Button
                                            type='submit'
                                            variant='outlined'
                                            color='primary'
                                            disableElevation
                                            sx={{ width: '25%' }}
                                        >
                                            Join Organization
                                        </Button>
                                    </FormGroup>
                                </form>
                            </StackItem>
                            <StackItem text='Create an Organization'>
                                <form onSubmit={createOrg}>
                                    <FormGroup row>
                                        <TextField
                                            label='Organization Name'
                                            name='name'
                                            value={form.name}
                                            onChange={handleChange}
                                            sx={{ width: '70%' }}
                                        />
                                        <Button
                                            type='submit'
                                            variant='outlined'
                                            color='primary'
                                            disableElevation
                                            sx={{ width: '30%' }}
                                        >
                                            Create Organization
                                        </Button>
                                    </FormGroup>
                                </form>
                            </StackItem>
                            <StackItem>
                                <Typography variant='h6'>
                                    <Link to='org' style={linkStyle}>
                                        Your Organizations
                                    </Link>
                                </Typography>
                                {ownedOrgs.length === 0 && (
                                    <Typography variant='body2'>
                                        You do own any organizations
                                    </Typography>
                                )}

                                {ownedOrgs.map((org) => (
                                    <OrgUnit org={org} />
                                ))}
                            </StackItem>
                            <StackItem>
                                <Typography variant='h6'>
                                    <Link to='org/joined' style={linkStyle}>
                                        Joined Organizations
                                    </Link>
                                </Typography>
                                {orgs.length === 0 && (
                                    <Typography variant='body2'>
                                        You are not a member in any
                                        organizations
                                    </Typography>
                                )}

                                {orgs.map((org) => (
                                    <OrgUnit org={org} />
                                ))}
                            </StackItem>
                        </Stack>
                    </Grid>
                    <Grid item xs={1} sm={3} md={3.5} />
                </Grid>
            </Box>
        </React.Fragment>
    );
}

export default MainPage;
