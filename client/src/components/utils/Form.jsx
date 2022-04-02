import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Form({ children }) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container
                    spacing={2}
                    alignItems='center'
                    style={{ height: '95vh' }}
                >
                    <Grid item xs={0.5} sm={2} md={4} />
                    <Grid item xs={11} sm={8} md={4}>
                        <Paper
                            sx={{
                                ...theme.typography.body2,
                                padding: '2vh',
                                textAlign: 'center',
                                color: theme.palette.text.secondary,
                            }}
                        >
                            {children}
                            <Outlet />
                        </Paper>
                    </Grid>
                    <Grid item xs={0.5} sm={2} md={4} />
                </Grid>
            </Box>
        </React.Fragment>
    );
}

export default Form;
