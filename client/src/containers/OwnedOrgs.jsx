import Helmet from 'react-helmet';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { OwnedOrgsDashboard } from '../controllers';

function OwnedOrgs() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <Helmet>
                <title>Owned Organizations | KnowItAll</title>
            </Helmet>
            <OwnedOrgsDashboard />
        </>
    );
}

export default OwnedOrgs;
