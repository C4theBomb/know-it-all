import Helmet from "react-helmet";

import { RegisterForm } from "../controllers";

function Register() {
    return (
        <>
            <Helmet>
                <title>Register | KnowItAll</title>
            </Helmet>
            <RegisterForm />
        </>
    );
}

export default Register;
