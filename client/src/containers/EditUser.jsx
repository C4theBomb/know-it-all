import Helmet from 'react-helmet';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { EditUserForm, RecordMp3 } from '../controllers';

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <Helmet>
                <title>Update Account Details | KnowItAll</title>
            </Helmet>
            <EditUserForm />
            <RecordMp3 />
        </>
    );
}

export default Login;
