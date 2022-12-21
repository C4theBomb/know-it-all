import Helmet from 'react-helmet';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { UpdateOrganizationForm } from '../controllers';

function UpdateOrganization() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <Helmet>
                <title>Update Organization | KnowItAll</title>
            </Helmet>
            <UpdateOrganizationForm />
        </>
    );
}

export default UpdateOrganization;
