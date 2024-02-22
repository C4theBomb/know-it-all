import Helmet from "react-helmet";

import { LoginForm } from "../controllers";

function Login() {
    return (
        <>
            <Helmet>
                <title>Login | KnowItAll</title>
            </Helmet>
            <LoginForm />
        </>
    );
}

export default Login;
