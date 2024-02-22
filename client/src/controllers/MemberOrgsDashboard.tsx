import { useCallback, useEffect, useState } from "react";

import { OrganizationList } from "../components";
import createRequest from "../utils/requests";
import { Organization } from "../types";

export default function MemberOrgsDashboard() {
    const [orgs, setOrgs] = useState<Organization[]>([]);

    const getOrgs = useCallback(async () => {
        const instance = createRequest();
        const response = await instance.get("/auth/orgs");
        setOrgs(() => response.data.orgs);
    }, []);

    useEffect(() => {
        getOrgs();
    }, [getOrgs]);

    return <OrganizationList orgs={orgs} />;
}
