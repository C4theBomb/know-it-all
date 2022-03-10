import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';

import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    IconButton,
    CssBaseline,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Header() {
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    const linkStyle = { textDecoration: 'none', color: 'inherit' };
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    useEffect(() => {
        setToken(() => Cookies.get('token'));
    }, [navigate]);

    async function handleLogout() {
        await axios.post(`${process.env.DOMAIN_ROOT}/auth/logout`, {
            token: Cookies.get('token'),
        });
        Cookies.remove('token');
        Cookies.remove('userID');
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
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant='h6'
                            component='div'
                            sx={{ flexGrow: 1 }}
                        >
                            KnowItAll
                        </Typography>

                        {token && (
                            <Button onClick={handleLogout} color='inherit'>
                                <Link to='/login' style={linkStyle}>
                                    Logout
                                </Link>
                            </Button>
                        )}
                        {!token && (
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
                        )}
                    </Toolbar>
                </AppBar>
                <Outlet />
            </ThemeProvider>
        </React.Fragment>
    );
}

export default Header;
