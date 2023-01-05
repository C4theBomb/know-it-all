import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';

export default function MobileNavbar({ logout, userData, open, setOpen, mode, toggleMode }) {
    function ControlButtons() {
        return userData?.email ? (
            <ListItem>
                <ListItemButton color='inherit' component={Link} to='/login' onClick={logout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </ListItemButton>
            </ListItem>
        ) : (
            <>
                <ListItem>
                    <ListItemButton color='inherit' component={Link} to='/login'>
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText>Login</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton color='inherit' component={Link} to='/register'>
                        <ListItemIcon>
                            <AppRegistrationIcon />
                        </ListItemIcon>
                        <ListItemText>Register</ListItemText>
                    </ListItemButton>
                </ListItem>
            </>
        );
    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton component={Link} to='/' sx={{ margin: '0 1vw 0 0 ' }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' component='div'>
                    KnowItAll
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

                <Button color='inherit' onClick={setOpen}>
                    Menu
                </Button>
            </Toolbar>
            <Drawer anchor='right' open={open} onClose={setOpen}>
                <List>
                    <ControlButtons />
                    <ListItem>
                        <ListItemButton onClick={toggleMode}>
                            <ListItemIcon>
                                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                            </ListItemIcon>
                            <ListItemText>
                                Switch to {mode === 'light' ? 'dark' : 'light'} mode
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
}
