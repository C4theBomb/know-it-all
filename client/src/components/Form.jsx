import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Form({ children, text }) {
    const theme = useTheme();

    return (
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
                        {text && (
                            <Typography
                                variant='h4'
                                sx={{ marginTop: '1vh 0vh' }}
                            >
                                {text}
                            </Typography>
                        )}
                        {children}
                        <Outlet />
                    </Paper>
                </Grid>
                <Grid item xs={0.5} sm={2} md={4} />
            </Grid>
        </Box>
    );
}

export default Form;
