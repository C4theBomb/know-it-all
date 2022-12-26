import Cookies from 'js-cookie';
import { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { MainPageDisplay } from '../controllers';

function MainPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <Helmet>
                <title>KnowItAll</title>
            </Helmet>
            <MainPageDisplay />
        </>
    );
}

export default MainPage;
