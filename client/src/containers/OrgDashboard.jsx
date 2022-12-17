import Helmet from 'react-helmet';

import { Dashboard } from '../controllers';

function OrgDashboard() {
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
