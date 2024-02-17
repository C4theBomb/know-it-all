import { useCallback, useEffect, useState } from 'react';

import { OrganizationList } from '../components';
import { createRequest } from '../utils/requests';

function MemberOrgsDashboard() {
    const [orgs, setOrgs] = useState([]);

    const getOrgs = useCallback(async () => {
        try {
            const instance = createRequest();
            const response = await instance.get('/auth/orgs');
            setOrgs(() => response.data.orgs);
        } catch (error) {}
    }, []);

    useEffect(getOrgs, [getOrgs]);

    return <OrganizationList orgs={orgs} />;
}

export default MemberOrgsDashboard;
