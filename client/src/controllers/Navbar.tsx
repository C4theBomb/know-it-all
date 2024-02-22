import { useMediaQuery, Theme } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MobileNavbar, Navbar } from "../components";
import { useMode, useUser } from "../contexts";
import createRequest from "../utils/requests";

export default function NavbarController() {
    const navigate = useNavigate();
    const { userData, setUserData } = useUser();
    const { mode, setMode } = useMode();

    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((initial) => !initial);

    const toggleMode = () => {
        setMode(() => (mode === "light" ? "dark" : "light"));
    };

    const sm = useMediaQuery((theme: Theme) => theme.breakpoints.only("sm"));
    const md = useMediaQuery((theme: Theme) => theme.breakpoints.only("md"));

    const logoutUser = async () => {
        try {
            const instance = createRequest();
            await instance.post("/auth/logout");
        } finally {
            Cookies.remove("token");
            setUserData({
                email: "",
                firstName: "",
                username: "",
                age: 0,
                lastName: "",
                pronouns: "",
                nickname: "",
                id: 0,
            });
            navigate("/login");
        }
    };

    return md || sm
        ? Navbar({
            logout: logoutUser,
            userData,
            mode,
            toggleMode,
        })
        : MobileNavbar({
            logout: logoutUser,
            userData,
            open,
            toggleOpen,
            mode,
            toggleMode,
        });
}
