import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar({ logout, userData, mode, toggleMode }) {
    function NavbarControls() {
        return userData.username ? (
            <Button
                color='inherit'
                component={Link}
                to='/login'
                onClick={logout}
                sx={{ margin: '0 1vh' }}
            >
                Logout
            </Button>
        ) : (
            <>
                <Button color='inherit' component={Link} to='/login'>
                    Login
                </Button>
                <Button color='inherit' component={Link} to='/register'>
                    Register
                </Button>
            </>
        );
    }
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton
                    color='inherit'
                    component={Link}
                    to='/'
                    sx={{ margin: '1vh 1vw 1vh 0' }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' component='div'>
                    KnowItAll
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton color='inherit' onClick={toggleMode} sx={{ margin: '0 1vh' }}>
                    {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
                <NavbarControls />
            </Toolbar>
        </AppBar>
    );
}
