import React, { createContext, useContext } from "react";

import { ThemeMode } from "../types";

interface ModeContextData {
    mode: ThemeMode;
    setMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}

const ModeContext = createContext<ModeContextData | undefined>(undefined);

export default ModeContext;

export const useMode = () => {
    const context = useContext(ModeContext);

    if (!context) {
        throw new Error("useMode must be used within a ModeProvider");
    }

    return context;
};
