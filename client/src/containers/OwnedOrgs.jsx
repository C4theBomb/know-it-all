import Helmet from 'react-helmet';

import { OwnedOrgsDashboard } from '../controllers';

function OwnedOrgs() {
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
