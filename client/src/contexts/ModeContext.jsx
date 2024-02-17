import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

const ModeContext = createContext();

export default function ModeProvider({ children }) {
    const [mode, setMode] = useState(Cookies.get('theme') || 'light');

    useEffect(() => {
        Cookies.set('theme', mode);
    }, [mode]);

    return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>;
}

export const useMode = () => useContext(ModeContext);
