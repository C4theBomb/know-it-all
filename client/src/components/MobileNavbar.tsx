import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
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
} from "@mui/material";
import { Link } from "react-router-dom";

import { User, ThemeMode } from "../types";

interface ControlButtonsProps {
    userData: User;
    logout: () => void;
}

function ControlButtons({ userData, logout }: ControlButtonsProps) {
    return userData.username ? (
        <ListItem>
            <ListItemButton
                color="inherit"
                component={Link}
                to="/login"
                onClick={logout}
            >
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </ListItemButton>
        </ListItem>
    ) : (
        <>
            <ListItem>
                <ListItemButton color="inherit" component={Link} to="/login">
                    <ListItemIcon>
                        <LoginIcon />
                    </ListItemIcon>
                    <ListItemText>Login</ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton color="inherit" component={Link} to="/register">
                    <ListItemIcon>
                        <AppRegistrationIcon />
                    </ListItemIcon>
                    <ListItemText>Register</ListItemText>
                </ListItemButton>
            </ListItem>
        </>
    );
}

interface MobileNavbarProps {
    userData: User;
    logout: () => void;
    open: boolean;
    toggleOpen: () => void;
    mode: ThemeMode;
    toggleMode: () => void;
}

export default function MobileNavbar({
    logout,
    userData,
    open,
    toggleOpen,
    mode,
    toggleMode,
}: MobileNavbarProps) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    component={Link}
                    to="/"
                    sx={{ margin: "0 1vw 0 0 " }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div">
                    KnowItAll
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

                <Button color="inherit" onClick={toggleOpen}>
                    Menu
                </Button>
            </Toolbar>
            <Drawer anchor="right" open={open} onClose={toggleOpen}>
                <List>
                    <ControlButtons userData={userData} logout={logout} />
                    <ListItem>
                        <ListItemButton onClick={toggleMode}>
                            <ListItemIcon>
                                {mode === "light" ? (
                                    <DarkModeIcon />
                                ) : (
                                    <LightModeIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText>
                                Switch to {mode === "light" ? "dark" : "light"}{" "}
                                mode
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
}
