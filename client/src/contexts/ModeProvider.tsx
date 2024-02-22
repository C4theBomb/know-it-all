import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";

import { ThemeMode } from "../types";
import ModeContext from "./ModeContext";

interface ModeProviderProps {
    children: React.ReactNode;
}

export default function ModeProvider({ children }: ModeProviderProps) {
    const [mode, setMode] = useState<ThemeMode>(
        (Cookies.get("theme") as ThemeMode) || "light"
    );

    const contextValue = useMemo(() => ({ mode, setMode }), [mode, setMode]);

    useEffect(() => {
        Cookies.set("theme", mode);
    }, [mode]);

    return (
        <ModeContext.Provider value={contextValue}>
            {children}
        </ModeContext.Provider>
    );
}
