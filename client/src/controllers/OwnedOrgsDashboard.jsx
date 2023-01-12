import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { OrganizationList } from '../components';
import { getOwnedOrgs } from '../services/userServices';

function OwnedOrgsDashboard() {
    const [orgs, setOrgs] = useState([]);

    function getOrgs() {
        if (Cookies.get('token')) {
            getOwnedOrgs()
                .then((res) => {
                    setOrgs(() => res.orgs);
                })
                .catch((e) => {
                    console.error(e.response.data.error);
                });
        }
    }

    useEffect(getOrgs, []);

    return <OrganizationList orgs={orgs} />;
}

export default OwnedOrgsDashboard;
