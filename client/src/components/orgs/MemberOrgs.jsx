import React from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';

import Organizations from '../utils/Organizations';

function JoinedOrgs() {
    async function getOrgs(setOrgs) {
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

    return <Organizations retrieveOrgs={getOrgs} />;
}

export default JoinedOrgs;
