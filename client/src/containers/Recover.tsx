import Helmet from "react-helmet";

import { RecoverForm } from "../controllers";

function Login() {
    return (
        <>
            <Helmet>
                <title>Recover Password | KnowItAll</title>
            </Helmet>
            <RecoverForm />
        </>
    );
}

export default Login;
