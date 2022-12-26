import Helmet from 'react-helmet';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { MemberOrgsDashboard } from '../controllers';

function MemberOrgs() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <Helmet>
                <title>Member Organizations | KnowItAll</title>
            </Helmet>
            <MemberOrgsDashboard />
        </>
    );
}

export default MemberOrgs;
