import Helmet from 'react-helmet';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { EditUserForm, RecordMp3 } from '../controllers';
import { Form } from '../components';

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <Helmet>
                <title>Update Account Details | KnowItAll</title>
            </Helmet>
            <Form text='Update Account Details'>
                <EditUserForm />
                <RecordMp3 />
            </Form>
        </>
    );
}

export default Login;
