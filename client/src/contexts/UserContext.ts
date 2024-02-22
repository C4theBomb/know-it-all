import React, { createContext, useContext } from "react";

import { User } from "../types";

interface UserContextData {
    loading: boolean;
    userData: User;
    setUserData: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export default UserContext;

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
};
