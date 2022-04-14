import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
    AppBar,
    Button,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar({ token }) {
    const linkStyle = { textDecoration: 'none', color: 'inherit' };
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const darkTheme = createTheme({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 768,
                md: 1024,
            },
        },
    });

    function ButtonGroup({ token }) {
        if (token) {
            return (
                <React.Fragment>
                    <Button color='inherit'>
                        <Link to='/update' style={linkStyle}>
                            Account
                        </Link>
                    </Button>
                    <Button color='inherit'>
                        <Link to='/login' style={linkStyle}>
                            Logout
                        </Link>
                    </Button>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Button color='inherit'>
                        <Link to='/login' style={linkStyle}>
                            Login
                        </Link>
                    </Button>
                    <Button color='inherit'>
                        <Link to='/register' style={linkStyle}>
                            Register
                        </Link>
                    </Button>
                </React.Fragment>
            );
        }
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton
                            size='large'
                            edge='start'
                            color='inherit'
                            aria-label='menu'
                            sx={{ mr: 2 }}
                        >
                            <Link to='/' style={linkStyle}>
                                <MenuIcon />
                            </Link>
                        </IconButton>
                        <Typography
                            variant='h6'
                            component='div'
                            sx={{ flexGrow: 1 }}
                        >
                            KnowItAll
                        </Typography>

                        <ButtonGroup token={token} />
                    </Toolbar>
                </AppBar>
                <Outlet />
            </ThemeProvider>
        </React.Fragment>
    );
}

export default Navbar;
