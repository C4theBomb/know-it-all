import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Stack, Typography } from '@mui/material';

import OrgUnit from './OrgUnit';
import StackItem from './StackItem';
import { Form, FormButton, FormField } from './StyledElements';

function MainPageBase({ form, orgs, ownedOrgs, joinOrg, createOrg, handleChange }) {
    const linkStyle = { textDecoration: 'none', color: 'inherit' };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} alignItems='center' style={{ height: '95vh' }}>
                <Grid item xs={0.5} sm={2} md={4} />
                <Grid item xs={11} sm={8} md={4}>
                    <Stack spacing={2}>
                        <StackItem text='Join an Organization'>
                            <form onSubmit={joinOrg}>
                                <Form>
                                    <FormField
                                        label='Organization ID'
                                        name='id'
                                        value={form.id}
                                        onChange={handleChange}
                                    />
                                    <FormButton type='submit' variant='outlined'>
                                        Join Organization
                                    </FormButton>
                                </Form>
                            </form>
                        </StackItem>
                        <StackItem text='Create an Organization'>
                            <form onSubmit={createOrg}>
                                <Form>
                                    <FormField
                                        label='Organization Name'
                                        name='name'
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                    <FormButton type='submit' variant='outlined'>
                                        Create Organization
                                    </FormButton>
                                </Form>
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
                                <OrgUnit org={org} key={org.id} />
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
                                    You are not a member in any organizations
                                </Typography>
                            )}

                            {orgs.map((org) => (
                                <OrgUnit org={org} key={org.id} />
                            ))}
                        </StackItem>
                    </Stack>
                </Grid>
                <Grid item xs={0.5} sm={2} md={4} />
            </Grid>
        </Box>
    );
}

export default MainPageBase;
