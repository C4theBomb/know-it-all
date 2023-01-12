import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { OrganizationList } from '../components';
import { getMemberOrgs } from '../services/userServices';

function MemberOrgsDashboard() {
    const [orgs, setOrgs] = useState([]);

    function getOrgs() {
        if (Cookies.get('token')) {
            getMemberOrgs()
                .then((res) => {
                    setOrgs(() => res.orgs);
                })
                .catch((error) => {
                    const message = error.response.data;

                    console.error(message.error);
                });
        }
    }

    useEffect(getOrgs, []);

    return <OrganizationList orgs={orgs} />;
}

export default MemberOrgsDashboard;
