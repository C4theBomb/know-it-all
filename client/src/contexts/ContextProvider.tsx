import { ReactNode } from "react";

import ErrorProvider from "./ErrorProvider";
import ModeProvider from "./ModeProvider";
import UserProvider from "./UserProvider";

interface ContextProviderProps {
    children: ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
    return (
        <ModeProvider>
            <ErrorProvider>
                <UserProvider>{children}</UserProvider>
            </ErrorProvider>
        </ModeProvider>
    );
}
