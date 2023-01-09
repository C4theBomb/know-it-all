import { createContext, useContext, useState } from 'react';

export const ErrorContext = createContext();

export default function ModeProvider({ children }) {
    const [error, setError] = useState('');

    return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
}

export const useError = () => useContext(ErrorContext);
