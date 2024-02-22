import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { User, ThemeMode } from "../types";

interface NavbarControlsProps {
    userData: User;
    logout: () => void;
}

function NavbarControls({ userData, logout }: NavbarControlsProps) {
    return userData.email ? (
        <>
            <Button color="inherit" component={Link} to="/update">
                Account
            </Button>
            <Button
                color="inherit"
                component={Link}
                to="/login"
                onClick={logout}
                sx={{ margin: "0 1vh" }}
            >
                Logout
            </Button>
        </>
    ) : (
        <>
            <Button color="inherit" component={Link} to="/login">
                Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
                Register
            </Button>
        </>
    );
}

interface NavbarProps {
    userData: User;
    logout: () => void;
    mode: ThemeMode;
    toggleMode: () => void;
}

export default function Navbar({
    userData,
    logout,
    mode,
    toggleMode,
}: NavbarProps) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={{ margin: "1vh 1vw 1vh 0" }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div">
                    KnowItAll
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                    color="inherit"
                    onClick={toggleMode}
                    sx={{ margin: "0 1vh" }}
                >
                    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
                <NavbarControls userData={userData} logout={logout} />
            </Toolbar>
        </AppBar>
    );
}
