import { ErrorProvider, ModeProvider, UserProvider } from '.';

export default function ContextProvider({ children }) {
    return (
        <ModeProvider>
            <ErrorProvider>
                <UserProvider>{children}</UserProvider>
            </ErrorProvider>
        </ModeProvider>
    );
}
