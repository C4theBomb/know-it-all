import Helmet from 'react-helmet';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { OrganizationDashboard } from '../controllers';

function OrgDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <Helmet>
                <title>Dashboard | KnowItAll</title>
            </Helmet>
            <OrganizationDashboard />
        </>
    );
}

export default OrgDashboard;
