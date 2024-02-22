declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_DOMAIN_ROOT: string;
            REACT_APP_API_ROOT: string;
        }
    }
}
