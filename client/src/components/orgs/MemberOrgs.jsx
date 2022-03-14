import React from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';

import Organizations from '../utils/Organizations';

function JoinedOrgs() {
    async function getOrgs(setOrgs) {
        axios
            .get(
                `${
                    process.env.REACT_APP_DOMAIN_ROOT
                }/auth/orgs?token=${Cookies.get('token')}`
            )
            .then((response) => {
                setOrgs(() =>
                    response.data.map((org) => {
                        return {
                            orgID: org.orgID,
                            orgName: org.orgName,
                            memberCount: org.memberCount,
                            createdAt: org.createdAt,
                        };
                    })
                );
            });
    }

    return <Organizations retrieveOrgs={getOrgs} />;
}

export default JoinedOrgs;
