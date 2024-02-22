import React, { createContext, useContext } from "react";

interface ErrorContextData {
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

const ErrorContext = createContext<ErrorContextData | undefined>(undefined);

export default ErrorContext;

export const useError = () => {
    const context = useContext(ErrorContext);

    if (!context) {
        throw new Error("useError must be used within a ErrorProvider");
    }

    return context;
};
