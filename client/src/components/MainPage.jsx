import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { Paper, Button, Typography, Stack, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function MainPage() {
    const theme = useTheme();

    const [org, setOrg] = useState({});

    const linkStyle = { textDecoration: 'none', color: 'inherit' };

    return (
        <React.Fragment>
            <Paper
                sx={{
                    ...theme.typography.body2,
                    padding: '2vh',
                    color: theme.palette.text.secondary,
                    flexGrow: 1,
                    height: '30vh',
                    margin: '2vh',
                    overflow: 'auto',
                }}
            >
                {org && (
                    <React.Fragment>
                        <Typography variant='h6'>
                            <Link to={`orgs/${org.orgID}`} style={linkStyle}>
                                Your Organization: {org.orgName}
                            </Link>
                        </Typography>
                        <Box margin={2}>
                            <Stack spacing={2}>
                                <Typography variant='body1'>
                                    Members: {org.memberCount}
                                </Typography>
                                <Typography variant='body1'>
                                    Created On: {org.createdAt}
                                </Typography>
                            </Stack>
                        </Box>
                    </React.Fragment>
                )}
            </Paper>
            <Paper
                sx={{
                    ...theme.typography.body2,
                    padding: '2vh',
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    flexGrow: 1,
                    height: '57vh',
                    margin: '2vh',
                    overflow: 'auto',
                }}
            ></Paper>
        </React.Fragment>
    );
}

export default MainPage;
