import Helmet from 'react-helmet';

import { EditUserForm } from '../controllers';

function Login() {
    return (
        <>
            <Helmet>
                <title>Edit User | KnowItAll</title>
            </Helmet>
            <EditUserForm />
        </>
    );
}

export default Login;
