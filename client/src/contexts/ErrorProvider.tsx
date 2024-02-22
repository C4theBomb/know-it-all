import { useMemo, useState } from "react";

import ErrorContext from "./ErrorContext";

interface ErrorProviderProps {
    children: React.ReactNode;
}

export default function ErrorProvider({ children }: ErrorProviderProps) {
    const [error, setError] = useState("");

    const contextValue = useMemo(
        () => ({ error, setError }),
        [error, setError]
    );

    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
        </ErrorContext.Provider>
    );
}
