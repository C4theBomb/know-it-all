import Cookies from "js-cookie";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "./UserContext";

import createRequest from "../utils/requests";

import { User } from "../types";

interface UserProviderProps {
    children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
    const [userData, setUserData] = useState<User>({
        id: -1,
        firstName: "",
        lastName: "",
        pronouns: "",
        nickname: "",
        username: "",
        email: "",
        age: 0,
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const contextValue = useMemo(
        () => ({ loading, userData, setUserData }),
        [loading, userData, setUserData]
    );

    const loadUserData = useCallback(async () => {
        if (!loading) return;

        if (!Cookies.get("token")) {
            setLoading(() => false);
        }

        try {
            const instance = createRequest();
            const response = await instance.post("/auth/remember");

            setUserData(() => response.data.user);
        } catch (error) {
            Cookies.remove("token");
            navigate("/login");
        } finally {
            setLoading(() => false);
        }
    }, [navigate, loading]);

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
