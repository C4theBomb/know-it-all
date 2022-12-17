import React, { useEffect, useState } from 'react';

import { OrganizationList } from '../components';
import { getMemberOrgs } from '../services/userServices';

function MemberOrgsDashboard() {
    const [orgs, setOrgs] = useState([]);

    async function getOrgs() {
        getMemberOrgs().then((res) => {
            setOrgs(() => res.orgs);
        });
    }

    useEffect(getOrgs);

    return <OrganizationList orgs={orgs} />;
}

export default MemberOrgsDashboard;
