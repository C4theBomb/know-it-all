import Helmet from 'react-helmet';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Dashboard } from '../controllers';

function OrgDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <Helmet>
                <title>Dashboard | KnowItAll</title>
            </Helmet>
            <Dashboard />
        </>
    );
}

export default OrgDashboard;
