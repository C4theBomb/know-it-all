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
                    <Grid item xs={1} sm={3} md={4} />
                    <Grid item xs={10} sm={6} md={4}>
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
                    <Grid item xs={1} sm={3} md={4} />
                </Grid>
            </Box>
        </React.Fragment>
    );
}

export default Form;
