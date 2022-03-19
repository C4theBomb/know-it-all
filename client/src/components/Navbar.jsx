import React from 'react';
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

function Navbar({ tokenState }) {
    const navigate = useNavigate();

    const { token, setToken } = tokenState;

    const linkStyle = { textDecoration: 'none', color: 'inherit' };
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    function ButtonGroup({ token }) {
        if (token) {
            return (
                <Button onClick={handleLogout} color='inherit'>
                    <Link to='/login' style={linkStyle}>
                        Logout
                    </Link>
                </Button>
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

    async function handleLogout() {
        await axios
            .post(`${process.env.REACT_APP_API_ROOT}/auth/logout`, {
                token: Cookies.get('token'),
            })
            .catch((e) => {
                console.log(e);
            });

        Cookies.remove('token');
        Cookies.remove('userID');

        setToken(() => false);

        navigate('login');
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
