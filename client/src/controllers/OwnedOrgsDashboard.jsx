import React, { useEffect, useState } from 'react';

import { OrganizationList } from '../components';
import { getOwnedOrgs } from '../services/userServices';

function OwnedOrgsDashboard() {
    const [orgs, setOrgs] = useState([]);

    async function getOrgs() {
        getOwnedOrgs().then((res) => {
            setOrgs(() => res.orgs);
        });
    }

    useEffect(getOrgs);

    return <OrganizationList orgs={orgs} />;
}

export default OwnedOrgsDashboard;
