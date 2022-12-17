import Helmet from 'react-helmet';

import { MemberOrgsDashboard } from '../controllers';

function MemberOrgs() {
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
