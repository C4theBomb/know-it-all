import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import Organizations from '../components/Organizations';

function JoinedOrgs() {
    const [orgs, setOrgs] = useState([]);

    async function getOrgs() {
        axios
            .get(
                `${
                    process.env.REACT_APP_API_ROOT
                }/auth/orgs?token=${Cookies.get('token')}`
            )
            .then((response) => {
                setOrgs(() => response.data);
            });
    }

    useEffect(getOrgs);

    return <Organizations orgs={orgs} />;
}

export default JoinedOrgs;
